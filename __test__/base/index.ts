import { AppMode, PrickingApplication } from '../../src';
import supertest from 'supertest';
import path from 'path';

const application = new PrickingApplication({
  rootPath: path.resolve(__dirname, '../../app'),
  env: 'development',
  port: 8888,
  mode: AppMode.Test,
});

export const app = supertest(application.start());
