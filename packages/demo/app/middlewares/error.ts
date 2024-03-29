import { PrickingCtx } from '@pricking/core/dist/definitions/index';

export = () => async (ctx: PrickingCtx, next) => {
  try {
    await next();
  } catch (error) {
    const { method, url, body, query } = ctx.request as any;
    if (method === 'GET') {
      const errorObj = {
        method,
        url,
        query,
      };
      console.error(JSON.stringify(errorObj, null, 2));
    } else if (method === 'POST') {
      const errorObj = {
        method,
        url,
        body,
      };
      console.error(JSON.stringify(errorObj, null, 2));
    }
    console.error(error);

    ctx.fail(error.msg || error.message);
  }
};
