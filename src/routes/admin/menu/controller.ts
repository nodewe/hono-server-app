
import { Hono } from "hono";
import service from "./service.ts";
import { buildTree } from "@/utils/index.ts";

const menu = new Hono();

menu.get('/route/list',async (ctx)=>{
    try {
        const roleIds = ctx.state.userInfo.roleIds;
        //角色的code 集合
        const roles = ctx.state.userInfo.roles;
        // 根节点
        let menuList = await service.list(roleIds.join(","))
        //当前角色能访问的 菜单筛选出来
        menuList = buildTree({
          list: menuList,
            //@ts-ignore
          parentFunc(item) {
            return {
              sort: item.sort,
              component: item.component ? item.component : undefined,
              path: item.path ? item.path : undefined,
              redirect: item.redirect ? item.redirect : undefined,
              meta: {
                title: item.name,
                hidden: item.visible != 1,
                icon: item.icon,
                keepAlive: true,
                roles,
              },
            };
          },
          //@ts-ignore
          childFunc(item) {
            return {
              sort: item.sort,
              component: item.component ? item.component : undefined,
              path: item.path ? item.path : undefined,
              // redirect:item.redirect,
              name: item.path ? item.path.slice(0, 1)
                .toUpperCase() + item.path.slice(1)
                .toLowerCase() : undefined,
              meta: {
                title: item.name,
                hidden: item.visible != 1,
                icon: item.icon,
                keepAlive: true,
                roles,
              },
            };
          },
        });
  
  
        // await conn.commit()
        return ctx.success({data: menuList})
      } catch (e) {
        //    await conn.rollback()
        console.log(e);
      }
});




export default menu;