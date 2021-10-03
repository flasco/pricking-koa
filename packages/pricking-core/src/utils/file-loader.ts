import path from 'path';
import fse from 'fs-extra';

export const getDirFiles = (dir: string) => {
  if (!fse.existsSync(dir)) return [];
  const paths = [dir];
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

  return files;
};
