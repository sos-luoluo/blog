import connection from "./db/mysql";
import sequelize from "./db/sequelize";
import models from "./model";
import redisClient from "./redis/redis";
const koaCors = require('koa-cors');
const Router = require('koa-router'); 
const koaBody = require('koa-body')

const Koa = require("koa");
const app = (module.exports = new Koa());
const router = new Router();
(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.error("db init success");
    } catch (error) {
        console.error("db init error", error);
    }
})();
app.use(koaCors({ credentials: true }));
app.use(router.routes()).use(router.allowedMethods());
app.use(koaBody());
app.use(async function pageNotFound(ctx: any) {
    ctx.status = 200;
    switch (ctx.accepts("html", "json")) {
        default:
            ctx.cookies.set("token", "luoluo", {
                // maxAge: 10*24*60*60*1000, //cookie有效时长，单位：毫秒数
                // path: "/", //cookie保存路径, 默认是'/，set时更改，get时同时修改，不然会保存不上，服务同时也获取不到
                // secure: "false", //默认false，设置成true表示只有https可以访问
                // httpOnly: "true", //true，客户端不可读取
                // overwrite: true, //一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
            });
            const results = await sequelize.query(
                'SELECT * FROM `USER` WHERE `NAME` = "luoluo" AND `PASSWORD` ="20061226"'
            );
            ctx.type = "text";
            ctx.body = JSON.stringify(results);
    }
});

if (!module.parent) app.listen(5000);
