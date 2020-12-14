export const MainRouteSymbol = Symbol('main-route-path');
export const SubPathSymbol = Symbol('sub-route-path');
export const PathMethodSymbol = Symbol('route-method');
export const PathDescSymbol = Symbol('route-method');

/** 注册当前 controller 为 router */
export const Controller = (path = '/') => {
  return (target: any) => {
    if (!path.startsWith('/')) path = '/' + path;
    target.prototype[MainRouteSymbol] = path;
  };
};

const Request = (path: string, method: string) => {
  return (target: any, key: string) => {
    if (!path.startsWith('/')) path = '/' + path;
    target[key][SubPathSymbol] = path;
    target[key][PathMethodSymbol] = method;
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
    target[key][PathDescSymbol] = desc;
  };
};
