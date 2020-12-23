import koaLogger from 'koa-logger';
import compose from 'koa-compose';
import bodyParser from 'koa-bodyparser';

const middlewares = compose([bodyParser(), koaLogger()]);

export = middlewares;
