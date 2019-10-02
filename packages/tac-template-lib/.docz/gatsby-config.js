const { mergeWith } = require('lodash/fp')

let custom
try {
  custom = require('./gatsby-config.custom')
} catch (err) {
  custom = {}
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Tac Template Lib',
    description: 'A project for library',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Tac Template Lib',
        description: 'A project for library',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib',
          templates:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-plugin-docz/node_modules/docz-core/dist/templates',
          packageJson:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/package.json',
          docz: '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz',
          cache:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz/.cache',
          app:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz/app',
          appPublic:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz/public',
          appNodeModules:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/node_modules',
          appPackageJson:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/package.json',
          appYarnLock:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-plugin-docz/node_modules/_docz-core@2.0.0-rc.45@docz-core/yarn.lock',
          ownNodeModules:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-plugin-docz/node_modules/_docz-core@2.0.0-rc.45@docz-core/node_modules',
          gatsbyConfig:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/gatsby-config.js',
          gatsbyBrowser:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/gatsby-browser.js',
          gatsbyNode:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/gatsby-node.js',
          gatsbySSR:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/gatsby-ssr.js',
          importsJs:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz/app/imports.js',
          rootJs:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz/app/root.jsx',
          indexJs:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz/app/index.jsx',
          indexHtml:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz/app/index.html',
          db:
            '/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
