import Router from '@koa/router';
import { Context } from 'koa';
import path from 'path';
import compose from 'koa-compose';

import { MainRouteSymbol, PathDescSymbol, PathMethodSymbol, SubPathSymbol } from '../lib/decorator';
import { getDirFiles } from '../utils/file-loader';
import { IOptions } from '../definitions/application';
import { AppMode } from '../constants';

const methods = ['get', 'put', 'post', 'patch', 'delete', 'del'];

const createRouter = (Controller: any, router: Router, options: IOptions) => {
  const ptype = Controller?.prototype;
  const basePath = ptype?.[MainRouteSymbol];
  if (!basePath) return null;

  const uniqueMap = new Map();
  const routeMaper = [];

  const ctorName = Controller.name;

  Object.getOwnPropertyNames(ptype).forEach(key => {
    const clsProperty = ptype[key];
    if (typeof clsProperty === 'function') {
      const method: string = clsProperty[PathMethodSymbol];
      const desc: string = clsProperty[PathDescSymbol] || '';
      let subPaths = clsProperty[SubPathSymbol];

      if (!method) return;
      if (!methods.includes(method)) {
        throw new Error(`failed to register [${method}] ${key}`);
      }

      if (!Array.isArray(subPaths)) subPaths = [subPaths];

      subPaths.forEach(subPath => {
        const mergedPath = (basePath + subPath).replace(/\/{2,}/g, '/');
        if (subPath.includes('*')) {
          routeMaper.push({ method, mergedPath, desc, key });
        } else {
          routeMaper.unshift({ method, mergedPath, desc, key });
        }
      });
    }
  });

  routeMaper.forEach(({ method, mergedPath, desc, key }) => {
    const methodKey = `[${method.toUpperCase()}] ${mergedPath}`;
    const ctorKey = `${ctorName}.${key}`;

    if (uniqueMap.has(methodKey)) {
      throw new Error(
        `DUPLICATE PATH: ${methodKey} with ${ctorKey} -> ${uniqueMap.get(methodKey)}`
      );
    }

    uniqueMap.set(methodKey, [ctorKey, desc]);

    router[method](desc, mergedPath, async (ctx: Context) => {
      /** 每次请求都实例化的话可以让每次请求的都保持独立 */
      const c = new Controller(ctx, options);

      if (ctx.status !== 301 && ctx.status !== 302 && !ctx.body) {
        /** 依赖函数内的 this.ctx 来取得当前请求的内容 */
        await c[key]();
      }
    });
  });

  if (options.mode & AppMode.Debug) {
    uniqueMap.forEach((val, key) => {
      console.log(key, ...val);
    });
  }

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
