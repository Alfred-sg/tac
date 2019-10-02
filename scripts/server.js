const { fork } = require('child_process');
const { join } = require('path');

const SCRIPT = join(__dirname, '../packages/tac-cli/bin/index.js');

function startDevServer(opts = {}) {
  const { port = 3001, cwd } = opts;
  return new Promise(resolve => {
    console.log(`Start dev server for ${cwd}`);
    const child = fork(SCRIPT, ['server', '--port', port], {
      cwd: cwd,
      env: {
        ...process.env
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
  const devServers = [
    [12341, '../packages/tac-template-mobx']
  ];

  return Promise.all(
    devServers.map(([port, cwd]) => {
      return startDevServer({ port, cwd: join(__dirname, cwd) });
    }),
  );
}

start()
.then(() => {
  console.log('All dev servers are started.');
})
.catch(e => {
  console.log(e);
});;