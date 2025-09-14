
import db from "@/mysql/index.ts"
import { toLikeStr } from "@/utils/index.ts";
import dayjs from "dayjs";
import { ISysDictType } from "./dictTypeTyps.ts";

/**
* @description 字典类型分页
*/
const page = async (page: number, pageSize: number, keywords: string) => {

    const conn = await db.getConnection();
    const sql = `
    select id,name,code,status,remark,createTime,updateTime from sys_dict_type where concat(name,code) LIKE CONCAT('%', ?, '%') 
         limit ?,?`;
    const [result] = await conn.query(sql, [
        toLikeStr(keywords),
        // status, status,
        (page - 1) * pageSize, pageSize]);
    const rets = result as Array<ISysDictType>;
    // 循环处理时间
    rets.forEach(item => {
        item.createTime = item.createTime ? dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') : "-";
        item.updateTime = item.updateTime ? dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss') : "-";
    });
    //查出总数
    const [total] = await conn.query(`select count(id) as total,status from sys_dict_type where concat(name,code) LIKE CONCAT('%', ?, '%')`, [toLikeStr(keywords)]);
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
* @description 获取字典类型详情
*/

const info = async (dictTypeId: number) => { 
    const conn = await db.getConnection()
    const sql = `select id,name,code,status,remark from sys_dict_type where id = ?`
    const [result] = await conn.query(sql, [dictTypeId])
    const resultRet = result as Array<ISysDictType>;
    await conn.release()
    return resultRet[0]
}

/**
* @description 添加字典类型
*/

const add = async (dictType: ISysDictType) => { 
    const conn = await db.getConnection()
    const sql = `insert into sys_dict_type(name,code,status,remark,createTime,updateTime) values(?,?,?,?,?,?)`
    const [result] = await conn.query(sql, [
        dictType.name,
        dictType.code,
        dictType.status,
        dictType.remark,
        dictType.createTime,
        dictType.updateTime
    ])
    await conn.release()
    return result
}

/**
* @description 字典类型修改

*/
const update = async (dictType: ISysDictType) => { 
    const conn = await db.getConnection()
    const sql = `update sys_dict_type set name=?,code=?,status=?,remark=?,updateTime=? where id=?`
    const [result] = await conn.query(sql, [
        dictType.name,
        dictType.code,
        dictType.status,
        dictType.remark,
        dictType.updateTime,
        dictType.id
    ])
    await conn.release()
    const resultRet = result as queryResultType;
    if (resultRet.affectedRows > 0) {
        return true
    }
    return false
}

/**
* @description 删除字典类型
*/
const del = async (ids: string[]) => { 
    const conn = await db.getConnection()
    const sql = `delete from sys_dict_type where id in (?)`
    const [result] = await conn.query(sql, [ids])
    await conn.release()
    const resultRet = result as queryResultType;
    if (resultRet.affectedRows > 0) {
        return true
    }
    return false

}
export default {
    page,
    info,
    add,
    update,
    del
}