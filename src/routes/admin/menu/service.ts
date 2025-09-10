import db from "@/mysql/index.ts"

const list = async (roleId:string) => {
     const conn = await db.getConnection()
     const sql = 'select * from sys_menu where sys_menu.perm IS NULL AND id IN (select menu_id from sys_role_menu where FIND_IN_SET(role_id,?))';
     const [menuList] = await conn.query(sql, [roleId])
     return menuList
}


export default{
    list
}