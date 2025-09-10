


import db from "@/mysql/index.ts"

/**
* @description 获取下拉选项
*/
const options = async () => { 
    const conn = await db.getConnection()
    const sql = `select id,name from sys_role where deleted = 0`
    const [roleList] = await conn.query(sql);
    await conn.release()
    return roleList

}

export default {
    options
}