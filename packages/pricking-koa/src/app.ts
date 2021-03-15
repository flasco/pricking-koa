import Koa from 'koa';
import Router from '@koa/router';

import { IOptions } from './definitions/application';

import { AppMode } from './constants';
import { dependencyLoader } from './loader';

export class PrickingApplication {
  app: Koa;
  routers: Router;
  options: IOptions;

  constructor(options: IOptions) {
    options.rootPath = options.rootPath || process.cwd();
    options.env = options.env || 'development';
    options.mode = options.mode || AppMode.Normal;
    this.options = options;
    this.init();

    /** 如果是 test mode，不自动执行 start */
    this.options.mode & AppMode.Test || this.start();
  }

  init() {
    this.app = new Koa();
    dependencyLoader(this.app, this.options);
  }

  start() {
    const port = this.options?.port ?? 3000;
    return this.app.listen(port, () => {
      console.log('应用启动成功');
      console.log(`访问地址：http://127.0.0.1:${port}`);
      this.options?.loadedCallback?.();
    });
  }
}
