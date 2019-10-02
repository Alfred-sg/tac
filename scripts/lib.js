const { fork } = require('child_process');
const { join } = require('path');

const SCRIPT = join(__dirname, '../packages/tac-cli/bin/index.js');

function build(opts = {}) {
  const { cwd } = opts;
  return new Promise(resolve => {
    console.log(`lib for ${cwd}`);
    const child = fork(SCRIPT, ['lib'], {
      cwd: cwd,
      env: {
        ...process.env,
      },
    });
    child.on('message', args => {
      if (args.type === 'DONE') {
        resolve(child);
      }
    });
  });
}

function start() {
  const builds = [
    ['../packages/tac-template-lib']
  ];

  return Promise.all(
    builds.map(([cwd]) => {
      return build({ cwd: join(__dirname, cwd) });
    }),
  );
}

start()
.then(() => {
  console.log('All libs are started.');
})
.catch(e => {
  console.log(e);
});;