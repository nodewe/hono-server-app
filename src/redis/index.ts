import {Redis} from 'ioredis'


/**
* @description 实例化redis
* 
*/
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    password: '',
    db: 0
})


export default {
    /**
    * @description 设置缓存
    */
    set(key:any,value:any){
        return redis.set(key,value)
    },
    /**
    * @description 获取key 对应的value
    * @return
    */
    get(key:any){
        return redis.get(key)
    },

    /**
    * @description 删除key
    */
    del(key:any){
        return redis.del(key)
    },
    /**
    * @description 获取所有key
    */
    keys(pattern:any){
        return redis.keys(pattern)
    },
    /**
    * @description 写入一个可以过期的key
    */
    setex(key:any,value:any,time:any){ 
        return redis.setex(key,time,value)
    }
}
