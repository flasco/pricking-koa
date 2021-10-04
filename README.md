# pricking-koa-mono

> WARNING: now it's a toy, if you want use it in production environment, please consider carefully. :)

a simple node framework based on koa2, in order to improve development efficiency.

## TODO

* [ ] support load env config.
* [ ] improve test coverage.

## focus

> rootPath is application root directory

1. The rootPath must contain `controllers` folder to load router.
2. if want add extra middlewares, you can add `middlewares` folder in rootPath.

## Necessary directory convention specification

```bash
src
├── controllers # use decorator to define router
├── extends
│   └── context.ts # append extra property to ctx
└── middlewares # custom middlewares
```

## about extra middleware

Don't design middleware that depends on execution order.(if necessary, only export a compose middleware)

It's worth mentioning that the middleware loading will traverse every possible file under the folder.

## decorator

how to use it?

```ts
import { Controller, Description, Get } from '@pricking/core/dist/utils/decorator';
import BaseController from '@pricking/core/dist/controllers/BaseController';

// path pattern -> ${controllerPath}/*
@Controller('/v3/books')
class AnalyseController extends BaseController {
  @Index(['/', '(.*)']) // (.*) -> https://github.com/koajs/router/blob/master/history.md
  @Description()
  async index() {
    /** WARNING: should add plugin */
    this.ctx.render('book/index.ejs', { currentTime: Date.now() });
  }

  // path pattern -> ${controllerPath}/api/${subPath}
  // path register -> /v3/books/api/info
  // as same as @Post, @Delete, @Put
  @Get('/info')
  @Description('getBookInfo')
  async getBookInfo() {
    this.ctx.success({});
  }

  @Post('/search')
  @Description('search')
  async searchBook() {
    this.ctx.success({});
  }

  @Get('/origin')
  @Description('getBookOriginDetail')
  async getBookOriginDetail() {
    this.ctx.success({});
  }
}

export = AnalyseController;
```

```ts
import { PrickingApplication } from '@pricking/core';

new PrickingApplication({
  // framework will auto load route from <ROOT>/controllers
  rootPath: __dirname,
  port: 3002,
  env: 'dev',
  debug: true,
});
```

## middleware

```ts
export = (options: IOptions) => async (ctx, next) => {
  console.log(options.env);
  console.log('hello');
  await next();
  console.log('end');
};
```

## target

- [x] all in ts
- [x] debug in ts mode
- [x] lint
- [x] test
- [x] clean middleware loader
- [x] simple decorator to define route faster
- [x] support @Index decorator
