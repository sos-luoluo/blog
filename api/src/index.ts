const Koa = require("koa");
const koaCors = require("koa-cors");
const logger = require('koa-logger')
const koaBody = require("koa-body");
const bodyParser = require('koa-bodyparser')
import { getUserByToken } from "./auth/auth";
import router from "./router/router";
const app = (module.exports = new Koa());
import exception from "./exception/index"
import { any } from "sequelize/types/lib/operators";

app.use(logger())
app.use(async function (ctx:any,next:any) {
    await next()
    await koaCors({ credentials: true }).call(undefined,ctx)

})
app.use(koaBody())
app.use(async function getUser(ctx: any,next:any) {
    ctx.user = await getUserByToken(ctx.cookies.get("token"));
    await next()
});
app.use(async function pageNotFound(ctx: any,next:any) {
    try {
       await next()
        if(!ctx.body){
            ctx.status=404
            ctx.body=exception(404)
        }
    } catch (err) {
        ctx.status = 500;
        ctx.body = exception(500);
    }
});
app.use(router.routes()).use(router.allowedMethods());
if (!module.parent) app.listen(5000);
