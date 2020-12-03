import './paths';

import Koa from 'koa';
import Router from '@koa/router';
import path from 'path';

import { IOptions } from '@app/definitions/application';

import { middlewareInitializer } from './initializer/middleware';

class Application {
  app: Koa;
  routers: Router;
  options: IOptions;

  constructor(options: IOptions) {
    this.options = options;
    this.init();
    this.start();
  }

  init() {
    this.app = new Koa();

    middlewareInitializer(this.app, this.options);
  }

  start() {
    const port = this.options?.port ?? 3000;
    this.app.listen(port, () => {
      console.log('应用启动成功');
      console.log(`访问地址：'http://127.0.0.1:${port}`);
    });
  }
}

new Application({
  baseUrl: path.resolve(__dirname),
  port: 3001,
});
