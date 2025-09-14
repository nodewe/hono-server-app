
import { Hono } from "hono";
import service from "./service.ts";
import { buildTree } from "@/utils/index.ts";
import dayjs from "dayjs";

const menu = new Hono();

/**
* @description 添加菜单
*/
menu.post('/add', async (ctx) => {
  const body = await ctx.req.json()
  // console.log(body, '添加菜单')
  const types = {
    'CATALOG':1,
    'MENU':2,
    'EXTLINK':3,
    'BUTTON':4,
  };
  //@ts-ignore
  body.type = types[body.type]
  body.createTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
  body.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss")

  const res = await service.add(body)
  if(res){
    return ctx.success({  msg: "添加成功" })

  }
  return ctx.fail({ msg: "添加成功" })
});


/**
* @description 修改菜单
*/
menu.put('/update', async (ctx) => {
  const body = await ctx.req.json()
  // console.log(body, '修改菜单')
  const types = {
    'CATALOG':1,
    'MENU':2,
    'EXTLINK':3,
    'BUTTON':4,
  };
  //@ts-ignore
  body.type = types[body.type]
  body.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
  const res = await service.update(body)
  if(res){
    return ctx.success({  msg: "修改成功" })

  }
  return ctx.fail({ msg: "修改成功" })
});

menu.delete('/delete',async (ctx) => { 
  const body = await ctx.req.json()
      // console.log(body, '删除')
      if (Array.isArray(body) && body.length) {
          await service.del(body)
        
          return ctx.success({ msg: '删除成功' })
      }
});

/**
* @description 获取菜单选项列表
*/
menu.get('/options', async (ctx) => {
  const menuList = await service.options()
  if (menuList.length) {
    const data = buildTree({
      list: menuList,
      //@ts-ignore
      parentFunc(item) {
        return {
          value: item.id,
          label: item.name,
        };
      },
      //@ts-ignore
      childFunc(item) {
        return {
          value: item.id,
          label: item.name,
        };
      },
    });
    return ctx.success({ data })
  }
  return ctx.fail({ data: [] })

});
/**
* @description 获取菜单列表
*/

menu.get('/tree/list', async (ctx) => {
  let keywords = "";
  const query = ctx.req.query();
  if (query.keywords) {
    keywords = query.keywords;
  }
  //                          目录  菜单      外链   按钮
  const types = ['', 'CATALOG', 'MENU', 'EXTLINK', 'BUTTON'];
  const menuList = await service.treeList(keywords);

  const data = buildTree({
    list: menuList,
    //@ts-ignore
    parentFunc(item) {
      item.type = types[item.type];
      return item;
    },
    //@ts-ignore
    childFunc(item) {
      item.type = types[item.type];
      return item;
    },
  });
  return ctx.success({ data })

});

menu.get('/info',async (ctx) => { 
  const query = ctx.req.query()
  if(!query.menuId){
    return ctx.fail({ msg: '请输入菜单id' })
  }
  const menu = await service.info(+query.menuId)
  if(!menu){
    return ctx.fail({ msg: '菜单不存在' })
  }
  const types = [ '', 'CATALOG', 'MENU', 'EXTLINK', 'BUTTON' ];
  //@ts-ignore
  menu.type = types[menu.type];
  return ctx.success({ data: menu, msg: "成功" })
})

menu.get('/route/list', async (ctx) => {
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
    return ctx.success({ data: menuList })
  } catch (e) {
    //    await conn.rollback()
    console.log(e);
  }
});




export default menu;