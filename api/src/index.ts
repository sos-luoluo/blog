const Koa = require('koa');

const app = module.exports = new Koa();

app.use(async function pageNotFound(ctx:any) {
  ctx.status = 404;

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>测试404页面</p>';
      break;
    case 'json':
      ctx.body = {
        message: '测试404页面'
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = '测试404页面';
  }
});

if (!module.parent) app.listen(5000);
