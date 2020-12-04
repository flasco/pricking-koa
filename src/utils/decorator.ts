/** 注册当前 controller 为 router */
export const Controller = (path = '/') => {
  return (target: any) => {
    target.prototype.path = path;
  };
};

const Request = (path: string, method: string) => {
  return (target: any, key: string) => {
    if (!path.startsWith('/')) path = '/' + path;
    target[key].path = path;
    target[key].method = method;
  };
};

/** Get 请求 */
export const Get = (path = '/') => {
  return Request(path, 'get');
};

/** Post 请求 */
export const Post = (path = '/') => {
  return Request(path, 'post');
};

/** 路由注释 */
export const Description = (desc = '') => {
  return (target: any, key: string) => {
    target[key].desc = desc;
  };
};
