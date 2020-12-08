import Koa from 'koa';
import path from 'path';

import middlewares from '../middlewares';
import { loadRoutes } from './router';

import { IOptions } from '../definitions/application';
import { loadExtraMiddlewares } from './middleware';

export const dependencyLoader = (app: Koa, options: IOptions) => {
  app.use(middlewares);

  const mwreDir = path.resolve(options.baseUrl, 'middlewares');
  const ctorDir = path.resolve(options.baseUrl, 'controllers');

  const extraMiddleware = loadExtraMiddlewares(mwreDir);
  if (extraMiddleware) app.use(extraMiddleware);
  const routeMiddleware = loadRoutes(ctorDir);

  app.use(routeMiddleware);
};
