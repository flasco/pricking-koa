# pricking-koa <alpha>

a simple node framework based on koa2, in order to improve development efficiency.

## focus

> baseUrl is application root directory

1. The baseUrl must contain `controllers` folder to load router.
2. if want add extra middlewares, you can add `middlewares` folder in baseUrl.

## about extra middleware

Don't design middleware that depends on execution order.(if necessary, only export a compose middleware)

It's worth mentioning that the middleware loading will traverse every possible file under the folder.

## target

- [x] all in ts
- [x] debug in ts mode
- [ ] lint
- [ ] test
- [x] clean middleware loader
- [x] simple decorator to define route faster
- [ ] simple inject with DI
