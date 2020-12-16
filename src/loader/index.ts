import Koa from 'koa';

import middlewares from '../middlewares';
import { loadRoutes } from './router';

import { IOptions } from '../definitions/application';
import { loadExtraMiddlewares } from './middleware';

export const dependencyLoader = (app: Koa, options: IOptions) => {
  const { rootPath } = options;

  app.use(middlewares);

  const extraMiddleware = loadExtraMiddlewares(rootPath);
  if (extraMiddleware) app.use(extraMiddleware);
  const routeMiddleware = loadRoutes(rootPath);

  app.use(routeMiddleware);
};
