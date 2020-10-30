const redis = require("redis");
import config from "../config"
 // 为了安全redis不开放远程连接 本地调试的时候使用本地redis
const redisClient = redis.createClient(config.redis)
export default redisClient