import redisClient from "../redis/redis";

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

export async function delUserByToken(token:String) {
    if(token){
      return await redisClient.del(token)
    }
    return undefined
}

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