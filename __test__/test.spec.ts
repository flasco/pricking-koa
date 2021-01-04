import { app } from './base';

test('hello world', done => {
  app
    .get('/test/api/say-hello')
    .expect(200)
    .end((_, res) => {
      expect(res.body.data).toBe('asdasd');
      done();
    });
});

test('hello world', done => {
  app
    .get('/test/say-hello')
    .expect(200)
    .end((_, res) => {
      expect(res.body.data).toBe('asdasd');
      done();
    });
});
