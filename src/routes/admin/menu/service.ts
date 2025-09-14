import db from "@/mysql/index.ts"
import { ISysMenu } from "./menuType.ts";

/**
* @description 获取菜单列表
*/
const list = async (roleId:string) => {
     const conn = await db.getConnection()
     const sql = 'select * from sys_menu where sys_menu.perm IS NULL AND id IN (select menuId from sys_role_menu where FIND_IN_SET(roleId,?))';
     const [menuList] = await conn.query(sql, [roleId])
     conn.release()
     return menuList
}

/**
* @description 获取菜单选项

*/

const options = async () => { 
    const conn = await db.getConnection()
    const sql = 'select * from sys_menu'
    const [menuList] = await conn.query(sql)
    const menuListRet = menuList as ISysMenu[]
    await conn.release()
    return menuListRet

}

export default{
    list,
    options
}