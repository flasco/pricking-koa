import { app } from './base';

test('test @Get', done => {
  app
    .get('/test/api/say-hello')
    .expect(200)
    .end((_, res) => {
      console.log(res.body);
      expect(res.body.data).toBe('qweqwe');
      done();
    });
});

test('test @Index', done => {
  app
    .get('/test')
    .expect(200)
    .end((_, res) => {
      expect(res.body.data).toBe('asdasd');
      done();
    });
});

test('ctx.fail', done => {
  app
    .get('/test/api/say-hello2')
    .expect(200)
    .end((_, res) => {
      expect(res.body.msg).toBe('failed');
      done();
    });
});

test('ctx.fail - empty', done => {
  app
    .get('/test/api/say-hello3')
    .expect(200)
    .end((_, res) => {
      expect(res.body.msg).toBe('请求失败');
      done();
    });
});
