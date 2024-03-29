import path from 'path';
import { fs as fse } from 'zx';
import nodemon from 'nodemon';
import chalk from 'chalk';

const getConfig = (filePath: string) => {
  if (!fse.existsSync(filePath)) {
    throw new Error(`配置文件不存在:${filePath}`);
  }
  const file = fse.readFileSync(filePath, { encoding: 'utf-8' });
  try {
    return JSON.parse(file);
  } catch (error) {
    throw new Error('配置格式化失败');
  }
};

interface IPrickingConf {
  entryPoint: string;
  watch?: string[];
  ext?: string;
  ignore?: string[];
  delay?: number;
  env?: any;
  execArgs?: Array<[string, string] | string>;
}

const objInject = (key: string, value: any, defaultValue?: any) => {
  if (!value && defaultValue) {
    value = defaultValue;
  }
  return value ? { [key]: value } : {};
};

const convertConf = (confPath: string, pconf: IPrickingConf, argv: any) => {
  const entryPath = path.join(path.dirname(confPath), pconf.entryPoint);
  const register = require.resolve('esbuild-register');

  const execInstArr = ['node', `-r ${register}`, '-r tsconfig-paths/register'];

  if (pconf.execArgs && Array.isArray(pconf.execArgs)) {
    execInstArr.push(...pconf.execArgs.map(i => (typeof i === 'string' ? i : i.join(' '))));
  }

  if (argv?.inspect) {
    execInstArr.push('--inspect');
  }

  execInstArr.push(entryPath);

  const execInst = execInstArr.join(' ');

  const config = {
    ...objInject('watch', pconf.watch),
    ...objInject('ext', pconf.ext),
    ...objInject('ignore', pconf.ignore),
    ...objInject('env', pconf.env),
    ...objInject('delay', pconf.delay, 500),
    exec: execInst,
  };

  return config;
};

const start = (argv: any) => {
  const configPath = (argv.cpath as string) ?? './.pricking-config.json';
  const fullConfPath = path.resolve(process.cwd(), configPath);
  const config = getConfig(fullConfPath);
  const nodemonConf = convertConf(fullConfPath, config, argv);

  nodemon(nodemonConf);
  nodemon
    .on('start', () => null)
    .on('quit', function () {
      console.log(chalk.yellow('App has quit'));
      process.exit();
    })
    .on('restart', function (files: string[]) {
      console.log(chalk.gray('App restarted due to:'));
      files.slice(0, 2).forEach(filePath => {
        console.log(chalk.gray(`- ${filePath}`));
      });
      if (files.length > 2) {
        console.log(chalk.gray('and more...'));
      }
    });
};

export = start;
