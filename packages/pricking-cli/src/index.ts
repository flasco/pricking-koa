#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const cli = yargs(hideBin(process.argv));

cli
  .command(
    'init',
    '初始化配置',
    () => null,
    async () => {
      (await import('./cmds/init')).default();
    }
  )
  .command(
    'start [options]', // 尖括号必传，方括号选传
    '程式启动',
    yargs =>
      yargs.options({
        confgPath: {
          type: 'string',
          describe: 'cli config path',
          alias: 'cpath',
        },
        inspect: {
          type: 'boolean',
          describe: 'node debug flag',
        },
      }),
    async argv => {
      (await import('./cmds/run')).default(argv);
    }
  )
  .parse();
