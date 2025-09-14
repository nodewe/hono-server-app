import db from "@/mysql/index.ts"
import { ISysMenu } from "./menuType.ts";
import { toLikeStr } from "@/utils/index.ts";

/**
* @description 获取菜单列表展示
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

/**
* @description 获取菜单管理中的树形列表管理
*/
const treeList = async (keywords:string) => { 
   
      const conn = await db.getConnection()
      const sql = `select * from sys_menu where name LIKE concat('%',?,'%')`;

      const [result] = await conn.query(sql, [
        toLikeStr(keywords)
      ]);
      const menuListRet = result as ISysMenu[]
      await conn.release()
      return menuListRet 
    
}


/**
* @description 添加菜单
*/
const add = async (menu: ISysMenu) => { 
    const conn = await db.getConnection()
    await conn.beginTransaction()
    try {
        if(menu.parentId == '0'){
            menu.treePath = '0'
        }else{
            
            const sql = `select treePath from sys_menu where id = ?`
            const [result] = await conn.query(sql, [menu.parentId])
            
            const resultRet = result as Array<{ treePath: string }>
            menu.treePath = resultRet[0].treePath + ',' + menu.parentId
        }
       
        // 插入菜单
        const sql = `insert into sys_menu set ?`
        const [menuResult] = await conn.query(sql, [menu])
        const menuRes = menuResult as queryResultType
        await conn.commit()
        await conn.release()
        if(menuRes.affectedRows > 0){
            return true
        }
        return false
    } catch (error) {
        await conn.rollback()
        conn.release()
        throw error
    }
    
}

/**
* @description 获取菜单详情
*/
const info = async (menuId: number) => {    
    const conn = await db.getConnection()
    const sql = `select * from sys_menu where id = ?`;
    const [result] = await conn.query(sql, [menuId])
    const menuInfoRet = result as ISysMenu[]
    await conn.release()
    return menuInfoRet[0]

}
/**
* @description 删除
*/
const del = async (menuIds: string[]) => { 
    const conn = await db.getConnection()
    const sql = `delete from sys_menu where id in (?)`
    await conn.query(sql, [menuIds])
    await conn.release()
}

/**
* @description 修改
*/
const update = async (menu: ISysMenu) => { 

  const conn = await db.getConnection()
    await conn.beginTransaction()
    try {
        if(menu.parentId == '0'){
            menu.treePath = '0'
        }else{
            
            const sql = `select treePath from sys_menu where id = ?`
            const [result] = await conn.query(sql, [menu.parentId])
            
            const resultRet = result as Array<{ treePath: string }>
            menu.treePath = resultRet[0].treePath + ',' + menu.parentId
        }
       
        // 修改菜单
        const sql = `update sys_menu set name = ?,type = ?,path = ?,component = ?,perm = ?,visible = ?,sort = ?,icon = ?,redirect = ?,treePath = ?,updateTime = ? where id = ?`
        const [menuResult] = await conn.query(sql, [
            menu.name,
            menu.type,
            menu.path,
            menu.component,
            menu.perm,
            menu.visible,
            menu.sort,
            menu.icon,
            menu.redirect,
            menu.treePath,
            menu.updateTime,
            menu.id
        ])
        const menuRes = menuResult as queryResultType
        await conn.commit()
        await conn.release()
        if(menuRes.affectedRows > 0){
            return true
        }
        return false
    } catch (error) {
        await conn.rollback()
        conn.release()
        throw error
    }
    
}
export default{
    list,
    options,
    treeList,
    add,
    del,
    update,
    info
}