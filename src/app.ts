import Koa from 'koa';
import Router from '@koa/router';

import { IOptions } from './definitions/application';

import { dependencyLoader } from './loader';

export class PrickingApplication {
  app: Koa;
  routers: Router;
  options: IOptions;

  constructor(options: IOptions) {
    options.rootPath = options.rootPath || process.cwd();
    options.env = options.env || 'development';
    this.options = options;
    this.init();
    this.start();
  }

  init() {
    this.app = new Koa();
    dependencyLoader(this.app, this.options);
  }

  start() {
    const port = this.options?.port ?? 3000;
    this.app.listen(port, () => {
      console.log('应用启动成功');
      console.log(`访问地址：http://127.0.0.1:${port}`);
    });
  }
}
