import redisClient from "../redis/redis";
/**
 * 通过token查询用户信息
 */
export async function getUserByToken(token:String) {
    if(token){
        return new Promise(resolve=>{
            redisClient.get(token,function(err:any, reply:any){
                if(reply){
                    resolve(JSON.parse(reply))
                }else{
                    resolve(undefined)
                }
            })
        })
    }else{
        return undefined
    }
}
/**
 * 清除token
 */
export async function delUserByToken(token:String) {
    if(token){
      return await redisClient.del(token)
    }
    return undefined
}
/**
 * 设置用户token信息
 */
export async function setUserByToken(token:string,data?:any) {
    if(token){
        return new Promise((resolve,reject)=>{
            redisClient.set(token,JSON.stringify(data||{}),function(err:any, reply:any){
                if(err){
                    reject(err)
                }else{
                    resolve(reply)
                }
            })
        })
    }else{
        return "缺少token"
    }
}
/**
 * 查询用户是否通过权限验证
 */
export function levelAuth(ctx:any,level:number) {
    if(ctx.user&&ctx.user.level>=level){
        return true
    }else{
        return false
    }
}