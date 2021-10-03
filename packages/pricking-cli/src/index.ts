#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const cli = yargs(hideBin(process.argv));

cli
  .command(
    'start [options]', // 尖括号必传，方括号选传
    '程式启动',
    () => null,
    async argv => {
      (await import('./cmds/run')).default(argv);
    }
  )
  .options({
    confgPath: {
      type: 'string',
      describe: 'cli config path',
      alias: 'cpath',
    },
  })
  .parse();
