import koaLogger from 'koa-logger';
import compose from 'koa-compose';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import zlib from 'zlib';

const middlewares = compose([
  bodyParser(),
  compress({
    filter(content_type) {
      return /text/i.test(content_type);
    },
    threshold: 2048,
    gzip: {
      flush: zlib.constants.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: zlib.constants.Z_SYNC_FLUSH,
    },
    br: false, // disable brotli
  }),
  koaLogger(),
]);

export = middlewares;
