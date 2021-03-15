import { AppMode, PrickingApplication } from 'pricking-koa';

new PrickingApplication({
  rootPath: __dirname,
  port: 3002,
  env: 'dev',
  mode: AppMode.Debug,
});
