const Router = require('koa-router');
import {login} from "../service/user"
const router = new Router({
    prefix: '/api'
});
router.get("/test", async (ctx: any, next: any) => {
    await new Promise(resolve=>{
        setTimeout(()=>{
            ctx.body = "这是测试接口";
            resolve()
        },2000)
    })
    next()
});
router.post("/login",login)
export default router