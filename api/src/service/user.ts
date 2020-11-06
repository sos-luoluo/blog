import router from "../router/router";
router.get("/test", (ctx: any, next: any) => {
    ctx.body = "这是测试接口";
});
router.get("/login", async (ctx: any, next: any) => {
    console.log(ctx.request.body);
    ctx.response.body = "success";
});
