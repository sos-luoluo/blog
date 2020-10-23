import connection from "./db/mysql";
import sequelize from "./db/sequelize";
import models from "./model";
const Koa = require("koa");
const app = (module.exports = new Koa());

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        console.error("db init success");
    } catch (error) {
        console.error("db init error", error);
    }
})();
app.use(async function pageNotFound(ctx: any) {
    ctx.status = 200;
    switch (ctx.accepts("html", "json")) {
        default:
            const results = await sequelize.query(
                'SELECT * FROM `USER` WHERE `NAME` = "luoluo" AND `PASSWORD` ="20061226"'
            );
            ctx.type = "text";
            console.log(results);
            ctx.body = JSON.stringify(results);
    }
});

if (!module.parent) app.listen(5000);
