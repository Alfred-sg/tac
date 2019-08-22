import path from 'path';
import Command from 'common-bin';
import pkg from '../package.json';

type YargsType = {
  [propName: string]: any
};

class MainCommand extends Command {
  usage: string;
  load: Function;
  yargs: YargsType;

  constructor(rawArgv) {
    super(rawArgv);

    this.usage = 'Usage: tac <command> [options]';

    this.load(path.join(__dirname, 'commands'));

    this.yargs.alias('v', 'version');
  }

  strat(){
    console.log(this);
    super.start();
  }

  get version() {
    return pkg.version;
  }
}

export default MainCommand;