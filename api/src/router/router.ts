const Router = require("koa-router");
import { login as userLogin, resetPassword as userResetPassword, getUserInfo as userGetUserInfo, getUserList as userGetUserList } from "../service/user";
import { list as classificationList, creat as classificationCreat, update as classificationUpdate, del as classificationDel } from "../service/classification";
import {file as uploadFile } from "../service/upload"
import { list as aritcleList, getOne as articleGetOne, creat as aritcleCreat, update as aritcleUpdate, del as aritclenDel } from "../service/article";
const router = new Router({
    prefix: "/api",
});
router.get("/test", async (ctx: any, next: any) => {
    await new Promise((resolve) => {
        setTimeout(() => {
            ctx.body = "这是测试接口";
            resolve(undefined);
        }, 2000);
    });
    next();
});
router.post("/user/login", userLogin);
router.post("/user/resetpassword", userResetPassword);
router.post("/user/info", userGetUserInfo);
router.post("/user/list", userGetUserList);
router.post("/classification/list", classificationList);
router.post("/classification/creat", classificationCreat);
router.post("/classification/update", classificationUpdate);
router.post("/classification/del", classificationDel);
router.post("/upload/file", uploadFile);
router.post("/article/list", aritcleList);
router.post("/article/getOne", articleGetOne);
router.post("/article/creat", aritcleCreat);
router.post("/article/update", aritcleUpdate);
router.post("/article/del", aritclenDel);
export default router;
