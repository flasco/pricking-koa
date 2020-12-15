# pricking-koa <alpha>

a simple node framework based on koa2, in order to improve development efficiency.

WARNING: now only as an api server.

## focus

> baseUrl is application root directory

1. The baseUrl must contain `controllers` folder to load router.
2. if want add extra middlewares, you can add `middlewares` folder in baseUrl.

## about extra middleware

Don't design middleware that depends on execution order.(if necessary, only export a compose middleware)

It's worth mentioning that the middleware loading will traverse every possible file under the folder.

## decorator

how to use it?

```ts
import { Controller, Description, Get } from 'pricking-koa/dist/utils/decorator';
import BaseController from 'pricking-koa/dist/controllers/BaseController';

// path pattern -> ${controllerPath}/*
@Controller('/v3/books')
class AnalyseController extends BaseController {
  /** WARNING: now is not support */
  @Index(['/'])
  @Description()
  async index() {
    /** WARNING: now is not support */
    this.ctx.render('book/index.ejs', { currentTime: Date.now() });
  }

  // path pattern -> ${controllerPath}/api/${subPath}
  // path register -> /v3/books/api/info
  // as same as @Post, @Delete, @Put
  @Get('/info')
  @Description('查询书籍详情')
  async getBookInfo() {
    this.ctx.success({});
  }

  @Post('/search')
  @Description('搜索')
  async searchBook() {
    this.ctx.success({});
  }

  @Get('/origin')
  @Description('查询书籍书源详情')
  async getBookOriginDetail() {
    this.ctx.success({});
  }
}

export = AnalyseController;
```

## target

- [x] all in ts
- [x] debug in ts mode
- [x] lint
- [ ] test
- [x] clean middleware loader
- [x] simple decorator to define route faster
- [ ] simple inject with DI
- [ ] support ejs html render & @Index decorator
