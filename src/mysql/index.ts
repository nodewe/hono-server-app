import mysql from "mysql2/promise"

/**
* @description mysql
* @see https://sidorares.github.io/node-mysql2/docs/examples
* @example
* //获取连接
* const conn = await db.getConnection();
* //开启事务
* conn.beginTransaction();
* //查询
* conn.query("SELECT * FROM user");
* //提交事务
* conn.commit();
* //回滚事务
* conn.rollback();
* //释放连接
* conn.release();
* 
*/
const db = mysql.createPool({
  host: "192.168.126.130",
  user: "root",
  port:63306,
  charset: "utf8mb4",
  password: "$Czy1314520",
  database: "hono-base",
});



export default db;
