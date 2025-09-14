import { Hono } from "hono";
import service from "./service.ts";
import { buildTree } from "@/utils/index.ts";
import dayjs from "dayjs";

const deptController = new Hono()


/**
* @description 部门下拉选项
*/
deptController.get("/options", async (ctx) => {

    const deptOptions = await service.options()
    const data = buildTree({
        list: deptOptions,
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
    })

    return ctx.success({ data })

})


/**
* @description 部门列表
*/
deptController.get('/list', async (ctx) => {
    const query = ctx.req.query()
    let keywords = '',
    status = '';

    if (query.keywords) {
        keywords = query.keywords;
    }
    if (query.status) {
        status = query.status;
    }

    const deptList = await service.list(keywords,status)

    const data = buildTree({
        list: deptList,
        //@ts-ignore
        parentFunc: item => item,
        //@ts-ignore
        childFunc: item => item
    });


    return ctx.success({ data })
})


/**
* @description 删除
*/

deptController.delete('/delete', async (ctx) => {
    const body = await ctx.req.json()
    if (Array.isArray(body) && body.length) {
        await service.del(body)

        return ctx.success({ msg: '删除成功' })
    }
})


/**
* @description 获取部门详情
*/

deptController.get('/info', async (ctx) => { 
      const query = ctx.req.query()
      if(!query.deptId){
        return ctx.fail({ msg: '请输入部门id' })
      }
      const dept = await service.info(+query.deptId)
      if(!dept){
        return ctx.fail({ msg: '部门不存在' })
      }
      return ctx.success({ data: dept, msg: "成功" })
})


/**
* @description 添加
*/

deptController.post('/add', async (ctx) => { 
    const body = await ctx.req.json()
    if(!body.name){ 
        return ctx.fail({ msg: '请输入部门名称' })
    }
    if(body.parentId===undefined || body.parentId===''){ 
        return ctx.fail({ msg: '请输入父部门id' })
    }
    body.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
    body.createTime = dayjs().format("YYYY-MM-DD HH:mm:ss")

    const res = await service.add(body)
    if(!res){
        return ctx.fail({ msg: '添加失败' })
    }
    return ctx.success({ msg: '添加成功' })
});
/**
* @description 添加
*/

deptController.put('/update', async (ctx) => { 
    const body = await ctx.req.json()
    if(!body.id){ 
        return ctx.fail({ msg: '请输入部门id' })
    }
    if(!body.name){ 
        return ctx.fail({ msg: '请输入部门名称' })
    }
    if(body.parentId===undefined || body.parentId===''){ 
        return ctx.fail({ msg: '请输入父部门id' })
    }
    body.sort = body.sort || 1;
    body.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
    const res = await service.update(body)
    if(!res){
        return ctx.fail({ msg: '修改失败' })
    }
    return ctx.success({ msg: '修改成功' })
});



export default deptController