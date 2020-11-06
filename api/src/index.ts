const Koa = require("koa");
import sequelize from "./db/sequelize";
const koaCors = require("koa-cors");
const koaBody = require("koa-body");
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
import { getUserByToken } from "./auth/auth";
import router from "./router/router";
// import './service'
const app = (module.exports = new Koa());

router.post("/login", (ctx: any) => {
    console.log(ctx.request.body);
    ctx.response.body = "success";
});
app.use(logger())
// app.use(bodyParser())
app.use(koaCors({ credentials: true }));

app.use(async function getUser(ctx: any) {
    ctx.user = await getUserByToken(ctx.cookies.get("token"));
});
app.use(router.routes()).use(router.allowedMethods());

app.use(function pageNotFound(ctx: any) {
    switch (ctx.accepts("html", "json")) {
        default:
            ctx.status = 404;
            ctx.body = "你要的东西去娜美星了！";
    }
});
if (!module.parent) app.listen(5000);
