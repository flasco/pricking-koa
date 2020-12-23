import Router from '@koa/router';
import { Context } from 'koa';
import path from 'path';
import compose from 'koa-compose';

import { MainRouteSymbol, PathDescSymbol, PathMethodSymbol, SubPathSymbol } from '../lib/decorator';
import { getDirFiles } from '../utils/file-loader';
import { IOptions } from '../definitions/application';

const methods = ['get', 'put', 'post', 'patch', 'delete', 'del'];

const createRouter = (Controller: any, router: Router, options: IOptions) => {
  const ptype = Controller?.prototype;
  const basePath = ptype?.[MainRouteSymbol];
  if (!basePath) return null;

  const uniqueMap = new Map();

  Object.getOwnPropertyNames(ptype).forEach(key => {
    const clsProperty = ptype[key];
    if (typeof clsProperty === 'function') {
      const method: string = clsProperty[PathMethodSymbol];
      const desc: string = clsProperty[PathDescSymbol] || '';
      const subPath = clsProperty[SubPathSymbol];
      if (method) {
        if (!methods.includes(method)) {
          throw new Error(`failed to register [${method}] ${key}`);
        }

        const mergedPath = (basePath + subPath).replace(/\/{2,}/g, '/');
        const methodKey = `[${method.toUpperCase()}]${mergedPath}`;

        if (options.debug) console.log(methodKey, desc);

        const ctorKey = `${Controller.name}.${key}`;

        if (uniqueMap.has(methodKey)) {
          throw new Error(
            `DUPLICATE PATH: ${methodKey} with ${ctorKey} -> ${uniqueMap.get(methodKey)}`
          );
        }

        uniqueMap.set(methodKey, ctorKey);

        router[method](desc, mergedPath, async (ctx: Context) => {
          /** 每次请求都实例化的话可以让每次请求的都保持独立 */
          const c = new Controller(ctx, options);

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

export const loadRoutes = (rootPath: string, options: IOptions) => {
  const controllerDir = path.resolve(rootPath, 'controllers');

  const files = getDirFiles(controllerDir);
  const koaRouter = new Router();

  while (files.length) {
    const filePath = files.shift();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ctor = require(filePath);
    createRouter(ctor, koaRouter, options);
  }

  if (koaRouter.stack.length < 1) {
    throw new Error('route is empty, register failed');
  }

  const routerMiddleware = compose([koaRouter.routes(), koaRouter.allowedMethods()]);

  return routerMiddleware;
};
