import { AppMode, PrickingApplication } from '@pricking/core';

new PrickingApplication({
  rootPath: __dirname,
  port: 3002,
  env: 'dev',
  mode: AppMode.Debug,
});
