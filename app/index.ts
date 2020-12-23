import { PrickingApplication } from '../src';

new PrickingApplication({
  rootPath: __dirname,
  port: 3002,
  env: 'dev',
  debug: true,
});
