import Koa from 'koa';

import middlewares from '../middlewares';
import { loadRoutes } from './router';

import { IOptions } from '../definitions/application';
import { loadExtraMiddlewares } from './middleware';
import { loadContextExtends } from './extends';

export const dependencyLoader = (app: Koa, options: IOptions) => {
  const { rootPath } = options;

  app.use(middlewares);

  const extraMiddleware = loadExtraMiddlewares(rootPath, options);
  if (extraMiddleware) app.use(extraMiddleware);

  const routeMiddleware = loadRoutes(rootPath, options);
  app.use(routeMiddleware);

  loadContextExtends(app, rootPath, options);
};
