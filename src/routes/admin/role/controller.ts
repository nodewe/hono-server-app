import { Hono } from "hono";
import service from "./service.ts";
import dayjs from "dayjs";

const roleController = new Hono()
/**
* @description 获取角色下拉列表
*/
roleController.get('/options', async (ctx) => {
    const data = await service.options()  as Array<{ id: number, name: string }>;

    return ctx.success({
        data: data.map(ele => {
            return { value: ele.id, label: ele.name }
        })
    })
})

/**
* @description 添加角色
*/
roleController.post('/add', async (ctx) => { 
    const body = await ctx.req.json()
    if(!body.name){
        return ctx.fail({ msg: '请输入角色名称' })
    }
    if(!body.code){
        return ctx.fail({ msg: '请输入角色代码' })
    }
    body.sort = body.sort || 1;
    body.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    body.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
   const ret =  await service.add(body)
   if(ret){
    return ctx.success({ msg: '添加成功' })
   }
   return ctx.fail({ msg: '添加失败' })
})


/**
* @description 修改角色
*/
roleController.put('/update',async (ctx) => { 
    const body = await ctx.req.json()
    if(!body.id){
        return ctx.fail({ msg: '请输入角色id' })
    }
    if(!body.name){
        return ctx.fail({ msg: '请输入角色名称' })
    }
    if(!body.code){
        return ctx.fail({ msg: '请输入角色代码' })
    }
    body.sort = body.sort || 1;
    body.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
    const ret =  await service.update(body)
    if(ret){
     return ctx.success({ msg: '修改成功' })
    }
    return ctx.fail({ msg: '修改失败' })
})

/**
* @description 获取角色详情
*/
roleController.get('/info',async (ctx) => { 
    const query =  ctx.req.query()
    if(!query.roleId){
        return ctx.fail({ msg: '请输入角色id' })
    }
    const role = await service.info(+query.roleId)
    if(!role){
        return ctx.fail({ msg: '角色不存在' })
    }
    return ctx.success({ data: role, msg: "成功" })
});

/**
* @description 获取角色对应的菜单集合
*/
roleController.get('/menuIds',async (ctx) => { 
    const query =  ctx.req.query()
    if(!query.roleId){
        return ctx.fail({ msg: '请输入角色id' })
    }
    const menuList = await service.menuIds(+query.roleId)
    return ctx.success({ data: menuList, msg: "成功" })
})

/**
* @description 角色授权菜单
*/
roleController.put('/updateMenuIds',async (ctx) => { 
    const body = await ctx.req.json()
    if(!body.roleId){
        return ctx.fail({ msg: '请输入角色id' })
    }
    if(!body.menuIds){
        return ctx.fail({ msg: '请输入菜单id' })
    }
    await service.updateMenuIds(body.roleId,body.menuIds)
    return ctx.success({ msg: '成功' })

})

/**
* @description 删除角色
*/
roleController.delete('/delete', async (ctx) => {
    const body = await ctx.req.json()
    // console.log(body, '删除')
    if (Array.isArray(body) && body.length) {
        const ret = await service.del(body)
        if (!ret) {
            return ctx.fail({ msg: "删除失败" })
        }
        return ctx.success({ msg: '删除成功' })
    }
});

/**
* @description 角色分页
*/
roleController.get('/page',async (ctx) => { 
      const query =  ctx.req.query()
        let page = 1,
            size = 10,
            name = '';
        if (query.pageNum) {
            page = +query.pageNum || page
        }
        if (query.pageSize) {
            size = +query.pageSize || size
        }
        // 关键字
        if(query.name){
            name = query.name
        }
    
        const roleList = await service.page(page, size,name)
        return ctx.success({ data: roleList, msg: "成功" })
})

export default roleController   