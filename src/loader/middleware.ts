import path from 'path';
import compose from 'koa-compose';
import { getDirFiles } from '../utils/file-loader';

export const loadExtraMiddlewares = (rootUrl: string) => {
  const controllerDir = path.resolve(rootUrl, 'middlewares');

  const files = getDirFiles(controllerDir);

  const middlewares = [];

  while (files.length) {
    const filePath = files.shift();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mwre = require(filePath);
    if (typeof mwre === 'function') {
      middlewares.push(mwre);
    }
  }

  if (!middlewares.length) return null;

  return compose(middlewares);
};
