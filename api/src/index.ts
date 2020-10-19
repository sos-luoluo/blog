const Koa = require('koa');

const app = module.exports = new Koa();

import connection from "./mysql/mysql"

app.use(async function pageNotFound(ctx:any) {
  ctx.status = 200;
  
  switch (ctx.accepts('html', 'json')) {
    // case 'html':
    //   ctx.type = 'html';
    //   ctx.body = '<p>测试404页面</p>';
    //   break;
    // case 'json':
    //   ctx.body = {
    //     message: '测试404页面'
    //   };
    //   break;
    
    default:
      await new Promise((resolve)=>{
        connection.connect()
        connection.query('SELECT * FROM `USER` WHERE `NAME` = "luoluo" AND `PASSWORD` ="20061226"',function(err:any, results:any, fields:any){
          ctx.type = 'text';
          ctx.body =JSON.stringify(results) +"----"+ JSON.stringify(fields);
          resolve(ctx)
        })
      }) 
      
  }
});

if (!module.parent) app.listen(5000);
