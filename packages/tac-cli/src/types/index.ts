import * as yargs from "yargs";

export interface RegisterCommandOpts {
  aliases?: string[],
  command?: string,
  desc?: string,
  options?: { [key: string]: yargs.Options; },
}