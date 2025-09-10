import db from "@/mysql/index.ts"
import { ISysUser } from "./userType.ts"

/**
* @description 添加
*/
const add = async () => {
    const conn = await db.getConnection()

    conn.beginTransaction()
    try {
        const [result] = await conn.query('insert into user(username,password) values(?,?)', ['admin', '123456'])
    } catch (error) {

    }
}

/**
* @description 更新
*/
const update = () => {

}

/**
* @description 删除
*/
const del = () => {

}

/**
* @description 获取用户信息
*/
const info = async (userId: number) => {

    const conn = await db.getConnection();
    const [result] = await conn.query('select id,username,nickname,gender,dept_id,avatar,mobile,status,email,create_time,update_time from sys_user where id = ?', [userId]);
    await conn.release();
    const rets = result as Array<ISysUser>;
    const userInfo = rets[0];
    return userInfo;


}

/**
* @description 分页获取用户列表
*/
const page = async (page: number, pageSize: number) => {

    const conn = await db.getConnection();
  
    const [result] = await conn.query('select id,username,nickname,gender,dept_id,avatar,mobile,status,email,create_time,update_time from sys_user limit ?,?', [(page - 1) * pageSize, pageSize]);
    const rets = result as Array<ISysUser>;
    //查出总数
    const [total] = await conn.query('select count(id) as total from sys_user');
    const totalCount = (total as Array<{ total: number }>)[0].total;
    console.log('totalCount', totalCount);
    await conn.release();
    return {
        total: totalCount,
        currentPage: page,
        pageSize,
        record: rets
    };
}

/**
* @description 登录

*/
const login = async (username: string, password: string) => {
    const conn = await db.getConnection();
    const [result] = await conn.query('select id,username,nickname,gender,dept_id,avatar,mobile,status,email,create_time,update_time from sys_user where username = ? and password = ?', [username, password]);
    await conn.release();
    const rets = result as Array<ISysUser>;
    // await conn.commit();
    return rets[0];
}

export default {
    add,
    update,
    del,
    info,
    page,
    login
}