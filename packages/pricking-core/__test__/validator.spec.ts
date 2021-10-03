import { app } from './base';

test('validators - number', done => {
  app
    .get('/test/api/validator-1')
    .expect(200)
    .end((_, res) => {
      expect(res.body.msg).toBe('参数必须为数字');
      done();
    });
});

test('validators - required', done => {
  app
    .get('/test/api/validator-2')
    .expect(200)
    .end((_, res) => {
      expect(res.body.msg).toBe('不能为空');
      done();
    });
});

test('validators - required2', done => {
  app
    .get('/test/api/validator-3')
    .expect(200)
    .end((_, res) => {
      expect(res.body.msg).toBe('参数不得为空');
      done();
    });
});
