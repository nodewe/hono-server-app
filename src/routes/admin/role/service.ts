


import db from "@/mysql/index.ts"
import { toLikeStr } from "@/utils/index.ts";
import { ISysRole } from "./roleType.ts";
import dayjs from "dayjs";

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

/**
* @description 添加角色
*/
const add = async (role:ISysRole)=>{
    const conn = await db.getConnection()
    const sql = `insert into sys_role(name,code,sort) values(?,?,?)`
    const [result] = await conn.query(sql, [
        role.name,
        role.code,
        role.sort
    ])
    await conn.release()
    const resultRet = result as queryResultType;
    if (resultRet.affectedRows > 0) {
        return true
    }
    return false
}

/**
* @description 修改
*/
const update = async (role:ISysRole)=>{
    const conn = await db.getConnection()
    const sql = `update sys_role set name = ?,code = ?,sort = ?,status=? where id = ?`
    const [result] = await conn.query(sql, [
        role.name,
        role.code,
        role.sort,
        role.status,
        role.id
    ])
    await conn.release()
    const resultRet = result as queryResultType;
    if (resultRet.affectedRows > 0) {
        return true
    }
    return false
}
/**
* @description 删除
*/
const del = async (roleIds:string[])=>{
    const conn = await db.getConnection()
    const sql = `delete from sys_role where id in (?)`
    const [result] = await conn.query(sql, [roleIds])
    await conn.release()
    const resultRet = result as queryResultType;
    if (resultRet.affectedRows > 0) {
        return true
    }
    return false
}
/**
* @description 详情
*/
const info = async (roleId:number)=>{ 
    const conn = await db.getConnection()
    const sql = `select id,name,code,status from sys_role where id = ?`
    const [result] = await conn.query(sql, [roleId])
    const resultRet = result as Array<ISysRole>;
    await conn.release()
    return resultRet[0]
}


/**
* @description 获取角色对应的菜单id列表

*/
const menuIds = async (roleId:number)=>{ 
    const conn = await db.getConnection()
    const sql = `select menuId from sys_role_menu where roleId = ?`
    const [result] = await conn.query(sql, [roleId])
    const resultRet = result as Array<{ menuId: number }>;
    await conn.release()
    return resultRet.map(item => item.menuId)
}

/**
* @description 分页获取角色列表
*/
const page = async (page: number, pageSize: number, name: string) => {

    const conn = await db.getConnection();
    const sql = `
    select id,name,code,status,deleted,sort,createTime,updateTime from sys_role where concat(name) LIKE CONCAT('%', ?, '%') 
         limit ?,?`;
    const [result] = await conn.query(sql, [
        toLikeStr(name),
        (page - 1) * pageSize, pageSize]);
    const rets = result as Array<ISysRole>;
    // 循环处理时间
    rets.forEach(item => {
        item.createTime = item.createTime ? dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') : "-";
        item.updateTime = item.updateTime ? dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss') : "-";
    });
    //查出总数
    const [total] = await conn.query(`select count(id) as total,status from sys_role where concat(name) LIKE CONCAT('%', ?, '%')`, [toLikeStr(name)]);
    const totalCount = (total as Array<{ total: number }>)[0].total;
    // console.log('totalCount', totalCount);
    await conn.release();
    return {
        total: totalCount,
        currentPage: page,
        pageSize,
        record: rets
    };
}

/**
* @description 修改角色对应的菜单id
*/
const updateMenuIds = async (roleId:number,menuIds:number[])=>{ 
    const conn = await db.getConnection()
    const sql = `delete from sys_role_menu where roleId = ?`
    await conn.query(sql, [roleId])
    const sql2 = `insert into sys_role_menu(roleId,menuId) values ?`
    const values = menuIds.map(menuId => [roleId, menuId])
    await conn.query(sql2, [values])
    await conn.release()

}

export default {
    options,
    page,
    add,
    update,
    del,
    info,
    menuIds,
    updateMenuIds
}