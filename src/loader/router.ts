import Router from '@koa/router';
import { Context } from 'koa';
import fse from 'fs-extra';
import path from 'path';
import compose from 'koa-compose';

import {
  MainRouteSymbol,
  PathDescSymbol,
  PathMethodSymbol,
  SubPathSymbol,
} from '../utils/decorator';

const methods = ['get', 'put', 'post', 'patch', 'delete', 'del'];

const createRouter = (Controller: any, router: Router) => {
  const ptype = Controller?.prototype;
  const basePath = ptype?.[MainRouteSymbol];
  if (!basePath) return null;

  Object.getOwnPropertyNames(ptype).forEach(key => {
    const clsProperty = ptype[key];
    if (typeof clsProperty === 'function') {
      const method = clsProperty[PathMethodSymbol];
      const desc = clsProperty[PathDescSymbol] || '';
      const subPath = clsProperty[SubPathSymbol];
      if (method) {
        if (!methods.includes(method)) {
          throw new Error(`fail to registe [${method}] ${key}`);
        }

        const mergedPath = (basePath + subPath).replace(/\/{2,}/g, '/');
        router[method](desc, mergedPath, async (ctx: Context) => {
          /** 每次请求都实例化的话可以让每次请求的都保持独立 */
          /** TODO: 但是一个请求只会用到一个method，是不是有点浪费？ */
          /** 下次看看别的框架的 router 是怎么实现的 */
          const c = new Controller(ctx);

          if (ctx.status !== 301 && ctx.status !== 302 && !ctx.body) {
            /** 依赖函数内的 this.ctx 来取得当前请求的内容 */
            await c[key]();
          }
        });
      }
    }
  });

  return router;
};

export const loadRoutes = (controllerDir: string) => {
  if (!fse.existsSync(controllerDir)) {
    throw new Error('controllers directory not exist, register failed');
  }

  const paths = [controllerDir];
  const files = [];
  const koaRouter = new Router();

  while (paths.length) {
    const pathx = paths.shift();
    const contents = fse.readdirSync(pathx);

    while (contents.length) {
      const content = path.resolve(pathx, contents.shift());
      const stat = fse.statSync(content);
      if (stat.isDirectory()) paths.push(content);
      else if (stat.isFile()) files.push(content);
    }
  }

  while (files.length) {
    const filePath = files.shift();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ctor = require(filePath);
    createRouter(ctor, koaRouter);
  }

  if (koaRouter.stack.length < 1) {
    throw new Error('route is empty, register failed');
  }

  const routerMiddleware = compose([koaRouter.routes(), koaRouter.allowedMethods()]);

  return routerMiddleware;
};
