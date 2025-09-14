
import db from "@/mysql/index.ts"
import { toLikeStr } from "@/utils/index.ts";
import dayjs from "dayjs";
import { ISysDictData } from "./dictDataTyps.ts";

/**
* @description 字典数据分页
*/
const page = async (page: number, pageSize: number, keywords: string,typeCode: string) => {

    const conn = await db.getConnection();
    const sql = `
    select id,name,typeCode,value,status,remark,createTime,updateTime from sys_dict where typeCode = ? and concat(name) LIKE CONCAT('%', ?, '%') 
         limit ?,?`;
    const [result] = await conn.query(sql, [
        typeCode,
        toLikeStr(keywords),
        // status, status,
        (page - 1) * pageSize, pageSize]);
    const rets = result as Array<ISysDictData>;
    //查出总数
    const [total] = await conn.query(`select count(id) as total,status from sys_dict where typeCode=? and concat(name) LIKE CONCAT('%', ?, '%')`, [
        typeCode,
        toLikeStr(keywords)]);
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
* @description 获取字典数据详情
*/

const info = async (dictDataId: number) => { 
    const conn = await db.getConnection()
    const sql = `select id,name,typeCode,value,status,remark from sys_dict where id = ?`
    const [result] = await conn.query(sql, [dictDataId])
    const resultRet = result as Array<ISysDictData>;
    await conn.release()
    return resultRet[0]
}

/**
* @description 添加字典数据
*/

const add = async (dictData: ISysDictData) => { 
    const conn = await db.getConnection()
    const sql = `insert into sys_dict(name,typeCode,value,status,remark,createTime,updateTime) values(?,?,?,?,?,?,?)`
    const [result] = await conn.query(sql, [
        dictData.name,
        dictData.typeCode,
        dictData.value,
        dictData.status,
        dictData.remark,
        dictData.createTime,
        dictData.updateTime
    ])
    await conn.release()
    return result
}

/**
* @description 字典数据修改

*/
const update = async (dictData: ISysDictData) => { 
    const conn = await db.getConnection()
    const sql = `update sys_dict set name=?,typeCode=?,value=?,status=?,remark=?,updateTime where id=?`
    const [result] = await conn.query(sql, [
        dictData.name,
        dictData.typeCode,
        dictData.value,
        dictData.status,
        dictData.remark,
        dictData.updateTime,
        dictData.id
    ])
    await conn.release()
    const resultRet = result as queryResultType;
    if (resultRet.affectedRows > 0) {
        return true
    }
    return false
}

/**
* @description 删除字典数据
*/
const del = async (ids: string[]) => { 
    const conn = await db.getConnection()
    const sql = `delete from sys_dict where id in (?)`
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