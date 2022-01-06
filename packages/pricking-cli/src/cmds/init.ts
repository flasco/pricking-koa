import path from 'path';
import { fs } from 'zx';
import chalk from 'chalk';

const start = () => {
  const curPath = path.resolve();

  const filePath = path.resolve(curPath, '.pricking-config.json');
  fs.writeFileSync(
    filePath,
    JSON.stringify(
      {
        entryPoint: './src/index.ts',
        watch: ['src'],
        ext: 'ts',
        ignore: ['src/**/*.spec.ts'],
        env: {
          APP_ENV: 'development',
        },
        delay: 500,
      },
      null,
      2
    )
  );

  console.log(chalk.green('config generate succeed'));
  console.log(chalk.green(filePath));
};

export = start;
