import db from "@/mysql/index.ts"

/**
* @description 添加
*/
const add = async ()=>{
   const conn =  await db.getConnection()
   
}

/**
* @description 更新
*/
const update = ()=>{

}

/**
* @description 删除
*/
const del = ()=>{
    
}

/**
* @description 获取用户信息

*/
const info = ()=>{
    
}



export default {
    add,
    update,
    del,
    info
}