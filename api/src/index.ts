const Koa = require("koa");
import sequelize from "./db/sequelize";
const koaCors = require('koa-cors');
const Router = require('koa-router'); 
const koaBody = require('koa-body')
import {getUserByToken} from './auth/auth'

const app = (module.exports = new Koa());

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("db init success");
    } catch (error) {
        console.error("db init error", error);
    }
})();

const router = new Router({
    prefix: '/api'
});
router
    .get('/user',(ctx:any,next:any)=>{
        ctx.body="用户页面";
    })

app.use(koaCors({ credentials: true }));
app.use(async function getUser(ctx:any,next:any) {
    ctx.user=await getUserByToken(ctx.cookies.get('token'))
    next()
})
app.use(router.routes()).use(router.allowedMethods());
app.use(koaBody());
app.use(async function pageNotFound(ctx: any) {
    switch (ctx.accepts("html", "json")) {
        default:
            ctx.status = 404;
            ctx.body="你要的东西去娜美星了！"
    }
});

if (!module.parent) app.listen(5000);
