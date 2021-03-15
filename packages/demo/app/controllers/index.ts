import { Controller, Description, Get, Index } from 'pricking-koa';
import BaseController from 'pricking-koa/dist/controllers/BaseController';

@Controller('test')
class TestController extends BaseController {
  @Index(['say-hello', '', '(.*)'])
  @Description('测试，say hello~')
  helloHomePage() {
    this.ctx.hello();
    this.logger.warn('1');
    this.logger.error('1');
    this.logger.info('1');
    this.ctx.success('asdasd');
  }

  @Get('say-hello')
  @Description('测试，say hello~')
  sayHello() {
    this.ctx.hello();
    this.ctx.success('qweqwe');
  }

  @Get('say-hello2')
  sayHello2() {
    this.ctx.hello();
    this.ctx.fail('failed');
  }

  @Get('say-hello3')
  sayHello3() {
    this.validator.required('2', '不能为空').isNumber(1);
    this.ctx.hello();
    this.ctx.fail();
  }

  @Get('validator-1')
  sayHello4() {
    this.validator.isNumber(1, '必须是数字').isNumber('');
    this.ctx.fail();
  }

  @Get('validator-2')
  sayHello5() {
    this.validator.required('', '不能为空').required(undefined);
    this.ctx.fail();
  }

  @Get('validator-3')
  sayHello6() {
    this.validator.required(1, '不能为空').required('undefined');
    this.ctx.fail();
  }
}

export = TestController;
