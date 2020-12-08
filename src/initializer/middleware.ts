import Koa from 'koa';
import path from 'path';

import middlewares from '../middleware';
import { initRouters } from '../middleware/routers';

import { IOptions } from '../definitions/application';

export const middlewareInitializer = (app: Koa, options: IOptions) => {
  app.use(middlewares);

  // TODO: 后期作为框架的话还可以引入项目额外自定义的middleware
  // app.use(initExtraMiddleware());

  const routeMiddleware = initRouters(
    path.resolve(options.baseUrl, 'controllers')
  );

  app.use(routeMiddleware);
};
