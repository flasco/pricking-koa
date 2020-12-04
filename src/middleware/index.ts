import koaLogger from 'koa-logger';
import compose from 'koa-compose';
import bodyParser from 'koa-bodyparser';

import uesfulReqFunc from './useful-req';

const middlewares = compose([
  bodyParser(),
  koaLogger(),
  uesfulReqFunc(),
]);

export = middlewares;
