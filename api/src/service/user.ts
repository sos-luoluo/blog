import UserModel from "../model/user";
import exception from "../exception/index";
import { v4 as uuidv4 } from 'uuid';
const md5 = require('md5');
import {delUserByToken,setUserByToken} from "../auth/auth"
/**
 * 登录接口
 */
async function login (ctx: any, next: any) {
    if(ctx.request.body.username&&ctx.request.body.password){
        const user = await UserModel.findOne({ where: { username: ctx.request.body.username,password:md5(ctx.request.body.password)} });
        if(user){
            let token:string|undefined=ctx.cookies.get("token")
            if(token){
            await delUserByToken(token)
            }
            let newID=uuidv4()
            await setUserByToken(newID,user)
            ctx.cookies.set("token", newID, {
                maxAg: Date.now()+1000*60*60*24*10,
                path: "/",
                httpOnly: true,
                overwrite: true
            })
            ctx.body = JSON.stringify({
                code: 0,
                data:{},
                message: "登录成功"
            });
        }else{
            ctx.body = exception(1000);
        }
    }else{
        ctx.body = exception(400);
    }
    next()
}
/**
 * 修改密码接口
 */
async function resetPassword(ctx:any,next:any) {
    const user = await UserModel.findOne({ where: { username: ctx.request.body.username,password:md5(ctx.request.body.password)} });
    if(user){
        if(ctx.request.body.newPassword&&ctx.request.body.newPassword.length>=6){
            user.update({
                password: md5(ctx.request.body.newPassword)
            })
            let token:string|undefined=ctx.cookies.get("token")
            if(token){
            await delUserByToken(token)
            }
            let newID=uuidv4()
            await setUserByToken(newID,user)
            ctx.cookies.set("token", newID, {
                maxAg: Date.now()+1000*60*60*24*10,
                path: "/",
                httpOnly: true,
                overwrite: true
            })
            ctx.body = JSON.stringify({
                code: 0,
                data:{},
                message: "密码已重置"
            });
        }else{
            ctx.body = exception(400);
        }
    }else{
        ctx.body = exception(1001);
    }
    next()
}
export {
    login,
    resetPassword
}