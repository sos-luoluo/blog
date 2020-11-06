const Koa = require("koa");
const koaCors = require("koa-cors");
const logger = require('koa-logger')
const koaBody = require("koa-body");
const bodyParser = require('koa-bodyparser')
import { getUserByToken } from "./auth/auth";
import router from "./router/router";

const app = (module.exports = new Koa());
router.post("/login", (ctx: any,next:any) => {
    console.log(ctx.request.body);
    ctx.response.body = "success";
});
app.use(logger())
app.use(koaCors({ credentials: true }));
app.use(async function pageNotFound(ctx: any,next:any) {
    try {
       await next()
        if(!ctx.body){
            ctx.status=404
            ctx.body="你要的东西去娜美星了！"
        }
    } catch (err) {
        ctx.status = 500;
        ctx.body = "系统错误，请稍后再试";
    }
});
app.use(koaBody())
app.use(async function getUser(ctx: any,next:any) {
    ctx.user = await getUserByToken(ctx.cookies.get("token"));
    next()
});
app.use(router.routes()).use(router.allowedMethods());
if (!module.parent) app.listen(5000);
