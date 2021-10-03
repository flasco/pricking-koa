import path from 'path';
import compose from 'koa-compose';
import { getDirFiles } from '../utils/file-loader';
import { IOptions } from '../definitions/application';

export const loadExtraMiddlewares = (rootUrl: string, options: IOptions) => {
  const controllerDir = path.resolve(rootUrl, 'middlewares');

  const files = getDirFiles(controllerDir);

  const middlewares = [];

  while (files.length) {
    const filePath = files.shift();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mwreWrapper = require(filePath);
    if (typeof mwreWrapper === 'function') {
      const mwre = mwreWrapper(options);
      if (typeof mwre !== 'function') {
        throw new Error('unexpected middleware method, please watch readme.');
      }
      middlewares.push(mwre);
    }
  }

  if (!middlewares.length) return null;

  return compose(middlewares);
};
