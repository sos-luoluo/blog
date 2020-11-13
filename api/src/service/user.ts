import UserModel from "../model/user";
import exception from "../exception/index";
import { v4 as uuidv4 } from "uuid";
const md5 = require("md5");
import { delUserByToken, setUserByToken } from "../auth/auth";
import { levelAuth } from "../auth/auth";
/**
 * 登录接口
 */
async function login(ctx: any, next: any) {
    if (ctx.request.body.username && ctx.request.body.password) {
        const user = await UserModel.findOne({
            where: {
                username: ctx.request.body.username,
                password: md5(ctx.request.body.password),
            },
        });
        if (user) {
            let token: string | undefined = ctx.cookies.get("token");
            if (token) {
                await delUserByToken(token);
            }
            let newID = uuidv4();
            await setUserByToken(newID, user);
            ctx.cookies.set("token", newID, {
                maxAg: Date.now() + 1000 * 60 * 60 * 24 * 10,
                path: "/",
                httpOnly: true,
                overwrite: true,
            });
            ctx.body = JSON.stringify({
                code: 0,
                data: {},
                message: "登录成功",
            });
        } else {
            ctx.body = exception(1000);
        }
    } else {
        ctx.body = exception(400);
    }
    next();
}
/**
 * 修改密码接口
 */
async function resetPassword(ctx: any, next: any) {
    const user = await UserModel.findOne({
        where: {
            username: ctx.request.body.username,
            password: md5(ctx.request.body.password),
        },
    });
    if (user) {
        if (
            ctx.request.body.newPassword &&
            ctx.request.body.newPassword.length >= 6
        ) {
            user.update({
                password: md5(ctx.request.body.newPassword),
            });
            let token: string | undefined = ctx.cookies.get("token");
            if (token) {
                await delUserByToken(token);
            }
            let newID = uuidv4();
            await setUserByToken(newID, user);
            ctx.cookies.set("token", newID, {
                maxAg: Date.now() + 1000 * 60 * 60 * 24 * 10,
                path: "/",
                httpOnly: true,
                overwrite: true,
            });
            ctx.body = JSON.stringify({
                code: 0,
                data: {},
                message: "密码已重置",
            });
        } else {
            ctx.body = exception(400);
        }
    } else {
        ctx.body = exception(1001);
    }
    next();
}
/**
 * 获取当前登录用户信息
 */
async function getUserInfo(ctx: any, next: any) {
    if (ctx.user) {
        ctx.body = JSON.stringify({
                code: 0,
                data: {
                    username: ctx.user.username,
                    level: ctx.user.level,
                },
                message: "用户信息获取成功",
            });
    } else {
        ctx.body = exception(1002);
    }
    next();
}
/**
 * 获取用户列表
 */
async function getUserList(ctx: any, next: any) {
    if (levelAuth(ctx, 80)) {
        const { pageSize = 10, pageIndex = 1 } = ctx.request.body;
        const list = await UserModel.findAll({
            attributes:["username","level"],
            offset: pageSize * (pageIndex - 1),
            limit: pageSize,
        });
        const total = await UserModel.count();
        const res = {
            code: 0,
            data: {
                pageSize: pageSize,
                pageIndex: pageIndex,
                list: list || [],
                total: total,
            },
            message: "查询成功",
        };
        ctx.body = JSON.stringify(res);
    }else{
        ctx.body = exception(1010);
    }
    next();
}
export { login, resetPassword, getUserInfo,getUserList };
