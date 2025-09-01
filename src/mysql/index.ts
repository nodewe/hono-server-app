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
  host: "localhost",
  user: "root",
  port:3306,
  password: "root",
  database: "blog",
});



export default db;
