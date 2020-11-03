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