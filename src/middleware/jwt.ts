import jwt from "jsonwebtoken";
import { jwtConfig } from "@/config/index.ts";


import db from "@/mysql/index.ts"
import { errorCollector } from "@/utils/index.ts";

/**
* @description jwt中间件
*/
export const jwtMiddleware = async (ctx: any, next: any) => {
    const header =  ctx.req.header()
    if (header.authorization) {
        const token = header.authorization;
        try {
            const ret = await jwt.verify(token, jwtConfig.secret);
            const conn = await db.getConnection();
            // 直接将当前用户信息查出来
            let [info] = await conn.query(
                'select id,username,nickname,gender,avatar,mobile,status,email,deleted,createTime from sys_user where id = ?',
                // @ts-ignore
                [ret.id]
            );
            await conn.release();
            
             // @ts-ignore
            const userInfo = info[0];
            // 查询role 转换为code

            const [roleList] = await conn.query(
                'select id,code from sys_role where sys_role.id in (select roleId from sys_user_role where userId = ?)',
                 // @ts-ignore
                [ret.id]
            );
            await conn.release();
            
            // console.log(roleList, 'role');
            //保存角色code
             // @ts-ignore
            userInfo.roles = roleList.map(ele => ele.code);
            // 保存用户的roleId
             // @ts-ignore
            userInfo.roleIds = roleList.map(ele => ele.id);

            // 封装 perms
            // 使用角色的id集合查询 菜单表 里面perm不是NULL 并且菜单id 为 关联表使用role_id 查询到的菜单id 查询perm
            let [perms] = await conn.query(
                'select * from sys_menu where perm IS NOT NULL and sys_menu.id in (select menuId from sys_role_menu WHERE FIND_IN_SET(roleId,?))',
                [userInfo.roleIds.join(',')]
            );
            //释放连接
            await conn.release();
            //保存角色的perms权限
             // @ts-ignore
            userInfo.perms = perms.map(ele => ele.perm);
            ctx.state = {}
            ctx.state.userInfo = userInfo;
            await next();
        } catch (error) {
            errorCollector(error,ctx)
             // @ts-ignore
            if (error.name == 'TokenExpiredError') {
               return ctx.fail({
                    code:401,
                    msg:"用户信息过期"
                })
            } else {
                return ctx.fail({msg:"用户信息出错"})
            }
        }


    } else {

        return ctx.fail({
            code: 401,
            msg: "token验证失败"
        })
    }
}