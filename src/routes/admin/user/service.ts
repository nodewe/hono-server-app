import db from "@/mysql/index.ts";
import { ISysUser } from "./userType.ts";
import dayjs from "dayjs";
import { toLikeStr } from "@/utils/index.ts";

/**
 * @description 添加
 */
const add = async (user: ISysUser, roleId: string[]) => {
  const conn = await db.getConnection();
  await conn.beginTransaction();
  try {
    const insertSQL = `
            INSERT INTO sys_user(username,nickname,gender,password,deptId,avatar,mobile,email,createTime,updateTime) VALUES(?,?,?,?,?,?,?,?,?,?)
        `;
    const params = [
      user.username,
      user.nickname,
      user.gender,
      user.password,
      user.deptId,
      user.avatar,
      user.mobile,
      user.email,
      user.createTime,
      user.updateTime,
    ];
    const [userAdd] = await conn.query(insertSQL, params);
    const userAddRet = userAdd as queryResultType;
    // 如果添加成功
    if (userAddRet.affectedRows > 0) {
      const insertList = roleId.map((ele) => [ele, userAddRet.insertId]);
      // 角色添加
      const [roleAdd] = await conn.query(
        "INSERT INTO sys_user_role (roleId,userId) values ?",
        [insertList]
      );
      const roleAddRet = roleAdd as queryResultType;
      if (roleAddRet.affectedRows == insertList.length) {
        await conn.commit();
        conn.release();
        return true;
      }
    }
    await conn.rollback();
    conn.release();
    return false;
  } catch (error) {
    await conn.rollback();
    conn.release();
    throw error;
  }
};

/**
 * @description 更新用户
 */
const update = async (user: ISysUser, roleIds: string[]) => {
  const conn = await db.getConnection();
  await conn.beginTransaction();
  const sql = `
        update sys_user set username = ?,nickname = ?,gender = ?,deptId = ?,avatar = ?,mobile = ?,email = ?,updateTime=? where id = ?
    `;
  try {
    //更新用户基本信息
    const [result] = await conn.query(sql, [
      user.username,
      user.nickname,
      user.gender,
      user.deptId,
      user.avatar,
      user.mobile,
      user.email,
      user.updateTime,
      user.id,
    ]);
    const resultRet = result as queryResultType;
    if (resultRet.affectedRows > 0) {
      //更新用户对应的角色信息
      const [roleUpdate] = await conn.query(
        "delete from sys_user_role where userId = ?",
        [user.id]
      );
      const roleUpdateRet = roleUpdate as queryResultType;
      if (roleUpdateRet.affectedRows > 0) {
        const insertList = roleIds.map((ele) => [ele, user.id]);
        // 角色添加
        const [roleAdd] = await conn.query(
          "INSERT INTO sys_user_role (roleId,userId) values ?",
          [insertList]
        );
        const roleAddRet = roleAdd as queryResultType;
        if (roleAddRet.affectedRows == insertList.length) {
          await conn.commit();
          conn.release();
          return true;
        }
      }
    }
    await conn.rollback();
    conn.release();
    return false;
  } catch (error) {
    await conn.rollback();
    conn.release();
    throw error;
  }
};

/**
 * @description 删除
 */
const del = async (ids: string[]) => {
  const conn = await db.getConnection();
  await conn.beginTransaction();
  try {
    const [result] = await conn.query("delete from sys_user where id in (?)", [
      ids,
    ]);
    const resultRet = result as queryResultType;
    if (resultRet.affectedRows > 0) {
      // 删除对应的角色
      const [roleDel] = await conn.query(
        "delete from sys_user_role where userId in (?)",
        [ids]
      );
      const roleDelRet = roleDel as queryResultType;
      if (roleDelRet.affectedRows > 0) {
        await conn.commit();
        conn.release();
        return true;
      }
    }
    await conn.rollback();
    conn.release();
    return false;
  } catch (error) {
    await conn.rollback();
    conn.release();
    throw error;
  }
};

/**
 * @description 获取用户信息
 */
const info = async (userId: number) => {
  const conn = await db.getConnection();
  const [result] = await conn.query(
    "select id,username,nickname,gender,deptId,avatar,mobile,status,email from sys_user where id = ?",
    [userId]
  );
  // 查询对应的角色
  const [roleList] = await conn.query(
    "SELECT roleId FROM sys_user_role where userId = ?",
    [userId]
  );

  await conn.release();
  const roleIds = roleList as Array<{ roleId: number }>;
  const rets = result as Array<ISysUser>;
  const userInfo = rets[0];
  if (!userInfo) {
    return false;
  }
  //@ts-ignore
  userInfo.roleIds = roleIds.map((ele) => ele.roleId);
  return userInfo;
};

/**
 * @description 分页获取用户列表
 */
const page = async (
  page: number,
  pageSize: number,
  keywords: string,
  status: string
) => {
  const conn = await db.getConnection();
  const sql = `
    select id,username,nickname,gender,deptId,avatar,mobile,status,email,createTime from sys_user where concat(nickname,username,mobile) LIKE CONCAT('%', ?, '%') 
        and IF(''=?,TRUE,CAST(status AS SIGNED)=?) limit ?,?`;
  const [result] = await conn.query(sql, [
    toLikeStr(keywords),
    status,
    status,
    (page - 1) * pageSize,
    pageSize,
  ]);
  const rets = result as Array<ISysUser>;
  // 循环处理时间
  rets.forEach((item) => {
    item.createTime = item.createTime
      ? dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")
      : "-";
    item.updateTime = item.updateTime
      ? dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss")
      : "-";
  });
  //查出总数
  const [total] = await conn.query(
    `select count(id) as total,status from sys_user where concat(nickname,username,mobile) LIKE CONCAT('%', ?, '%') and IF(''=?,TRUE,CAST(status AS SIGNED)=?)`,
    [toLikeStr(keywords), status, status]
  );
  const totalCount = (total as Array<{ total: number }>)[0].total;
  // console.log('totalCount', totalCount);
  await conn.release();
  return {
    total: totalCount,
    currentPage: page,
    pageSize,
    record: rets,
  };
};

/**
* @description 登录

*/
const login = async (username: string, password: string) => {
  const conn = await db.getConnection();
  const [result] = await conn.query(
    "select id,username,nickname,gender,deptId,avatar,mobile,status,email from sys_user where username = ? and password = ?",
    [username, password]
  );
  // 释放连接
  await conn.release();
  const rets = result as Array<ISysUser>;
  return rets[0];
};

/**
* @description 修改用户状态

*/
const changeStatus = async (userId: number, status: number) => {
  const conn = await db.getConnection();
  const [result] = await conn.query(
    "update sys_user set status = ? where id = ?",
    [status, userId]
  );
  const resultRet = result as queryResultType;
  if (resultRet.affectedRows > 0) {
    await conn.release();
    return true;
  }
  await conn.release();
  return false;
};
/**
 * @description 重置密码
 */
const resetPassword = async (userId: number, password: string) => {
  const conn = await db.getConnection();
  const [result] = await conn.query(
    "update sys_user set password = ? where id = ?",
    [password, userId]
  );
  const resultRet = result as queryResultType;
  if (resultRet.affectedRows > 0) {
    await conn.release();
    return true;
  }
  await conn.release();
  return false;
};

export default {
  resetPassword,
  changeStatus,
  add,
  update,
  del,
  info,
  page,
  login,
};
