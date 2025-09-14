import db from "@/mysql/index.ts"
import { toLikeStr } from "@/utils/index.ts";
import { ISysDept } from "./deptTypes.ts";
/**
* @description 添加部门
*/
const add = async (dept: ISysDept) => { 
    const conn = await db.getConnection()
    await conn.beginTransaction()
    try {
        if(dept.parentId == '0'){
            dept.treePath = '0'
        }else{
            
            const sql = `select treePath from sys_dept where id = ?`
            const [result] = await conn.query(sql, [dept.parentId])
            
            const resultRet = result as Array<{ treePath: string }>
            dept.treePath = resultRet[0].treePath + ',' + dept.parentId
        }
       
        // 插入部门
        const sql = `insert into sys_dept set ?`
        const [deptResult] = await conn.query(sql, [dept])
        const deptRes = deptResult as queryResultType
 
        if(deptRes.affectedRows > 0){
            await conn.commit()
            await conn.release()
            return true
        }
        await conn.rollback()
        await conn.release()
        return false
    } catch (error) {
        await conn.rollback()
        conn.release()
        throw error
    }
}


/**
* @description 修改部门
*/

const update = async (dept:ISysDept) => { 
    const conn = await db.getConnection()
    await conn.beginTransaction()
    try {
        if(dept.parentId == '0'){
            dept.treePath = '0'
        }else{
            
            const sql = `select treePath from sys_dept where id = ?`
            const [result] = await conn.query(sql, [dept.parentId])
            
            const resultRet = result as Array<{ treePath: string }>
            dept.treePath = resultRet[0].treePath + ',' + dept.parentId
        }
       
        // 修改部门
        const sql = `update sys_dept set name = ?, parentId = ?, treePath = ?, sort = ?, status = ? , updateTime = ? where id = ?`
        const [deptResult] = await conn.query(sql, [
            dept.name,
            dept.parentId,
            dept.treePath,
            dept.sort,
            dept.status,
            dept.updateTime,
            dept.id
        ])
        const deptRes = deptResult as queryResultType
 
        if(deptRes.affectedRows > 0){
            await conn.commit()
            await conn.release()
            return true
        }
        await conn.rollback()
        await conn.release()
        return false
    } catch (error) {
        await conn.rollback()
        conn.release()
        throw error
    }
}

/**
* @description 删除部门
*/
const del = async (deptIds: string[]) => { 
    const conn = await db.getConnection()
    const sql = `delete from sys_dept where id in (?)`
    await conn.query(sql, [deptIds])
    await conn.release()
    return true
}


/**
* @description 部门下拉选项
*/

const options = async () => { 
    const conn = await db.getConnection()
    const [result] = await conn.query('select * from sys_dept')
    const deptRes = result as Array<ISysDept>
    return deptRes
}

/**
* @description 获取菜单列表显示
*/
const list = async (keywords: string,status:string) => { 
    const conn = await db.getConnection()
    const [result] = await conn.query(`select * from sys_dept where IF(''=?,TRUE,CAST(status AS SIGNED)=?) and name LIKE concat('%',?,'%')`,[
        status,status,
        toLikeStr(keywords)
    ])
    const deptRes = result as Array<ISysDept>
    return deptRes
}

/**
* @description 获取部门详情
*/
const info = async (deptId: number) => { 
    const conn = await db.getConnection()
    const sql = `select * from sys_dept where id = ?`;
    const [result] = await conn.query(sql, [deptId])
    const deptInfoRet = result as ISysDept[]
    await conn.release()
    return deptInfoRet[0]
}


export default {
    add,
    options,
    list,
    del,
    info,
    update
}



