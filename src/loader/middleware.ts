import path from 'path';
import fse from 'fs-extra';
import compose from 'koa-compose';

export const loadExtraMiddlewares = (controllerDir: string) => {
  if (!fse.existsSync(controllerDir)) return null;
  const paths = [controllerDir];
  const files = [];

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

  const middlewares = [];

  while (files.length) {
    const filePath = files.shift();
    const mwre = require(filePath);
    middlewares.push(mwre);
  }

  if (!middlewares.length) return null;

  return compose(middlewares);
};
