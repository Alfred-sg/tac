import { join, extname } from 'path';
import { existsSync, statSync } from 'fs';
import * as babel from '@babel/core';
import * as rimraf from 'rimraf';
import * as vfs from 'vinyl-fs';
import * as through from 'through2';
import * as chokidar from 'chokidar';

interface TransformOptions {
  content: string,
  path: string,
  pkg: {
    tactools?: PkgTactools
  },
}

interface PkgTactools {
  isBrowser?: boolean,
  isTS?: boolean,
}

interface BuildOptions {
  cwd?: string,
  src?: string,
  lib?: string,
  watch?: boolean,
}

/**
 * babel 配置
 * @param opts 选项
 */
function getBabelConfig(opts: PkgTactools = {}) {
  return {
    presets: [
      [
        require.resolve('@tac/babel-preset-tac'),
        opts,
      ]
    ]
  }
}

/**
 * babel 编译
 * @param opts 编译内容、路径、选项
 */
function transform(opts: TransformOptions) {
  const { content, path, pkg: { tactools } } = opts;

  const babelConfig = getBabelConfig(tactools);
  const { code } = babel.transform(content, {
    ...babelConfig,
    filename: path,
  }) || { code: '' };
  
  return code;
}

export default function build(opts: BuildOptions = {}){
  const { cwd = process.cwd(), src = 'src', lib = 'lib', watch = false } = opts;
  const pkgPath = join(cwd, 'package.json');
  const pkg: object = require(pkgPath);
  const srcDir = join(cwd, src);
  const libDir = join(cwd, lib);

  rimraf.sync(join(cwd, libDir));

  function createStream(src: string){
    return vfs.src([join(src, '**/*')], {
      allowEmpty: true,
      base: srcDir,
    }).pipe(through.obj((f: { contents: string, path: string }, _, cb) => {
      if (['.js', '.ts'].includes(extname(f.path))) {
        f.contents = Buffer.from(
          transform({
            content: f.contents,
            path: f.path,
            pkg,
          }) || ''
        ).toString();
        f.path = f.path.replace(extname(f.path), '.js');
      }
      cb(null, f);
    })).pipe(vfs.dest(libDir));
  }

  const stream = createStream(srcDir);

  stream.on('end', () => {
    if (watch) {
      const watcher = chokidar.watch(join(cwd, srcDir), {
        ignoreInitial: true,
      });
      watcher.on('all', (_, fullPath) => {
        if (!existsSync(fullPath)) return;
        if (statSync(fullPath).isFile()) {
          createStream(fullPath);
        }
      });
    }
  });
}