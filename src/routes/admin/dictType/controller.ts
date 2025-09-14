import { Hono } from "hono";
import service from "./service.ts";


const dictTypeController = new Hono();


/**
* @description 获取字典类型分页列表
*/
dictTypeController.get('/page', async (ctx) => {
    const query = ctx.req.query()
    let page = 1,
        size = 10,
        keywords = '',
        status = '';
    if (query.pageNum) {
        page = +query.pageNum || page
    }
    if (query.pageSize) {
        size = +query.pageSize || size
    }
    // 关键字
    if (query.keywords) {
        keywords = query.keywords
    }
    // if(query.status){
    //     status = query.status
    // }

    const dictTypeList = await service.page(page, size, keywords)
    // console.log(userList,'userList')
    return ctx.success({ data: dictTypeList, msg: "成功" })
});

/**
* @description 获取字典类型详情
*/
dictTypeController.get('/info', async (ctx) => {
    const params = ctx.req.query()
    if (!params.dictTypeId) {
        return ctx.fail({ msg: "参数错误" })
    }
    const info = await service.info(+params.dictTypeId);
    if (!info) {
        return ctx.fail({ msg: "字典类型不存在" })
    }
    return ctx.success({ data: info, msg: "成功" })
})

/**
* @description 添加
*/

dictTypeController.post('/add', async (ctx) => {
    const body = await ctx.req.json()
    if (!body.name || !body.code) {
        return ctx.fail({ msg: "参数错误" })
    }
    const res = await service.add(body)
    if (res) {
        return ctx.success({ msg: "添加成功" })

    }
    return ctx.fail({ msg: "添加成功" })
})

/**
* @description 修改

*/
dictTypeController.put('/update', async (ctx) => {
    const body = await ctx.req.json()
    if (!body.id) {
        return ctx.fail({ msg: '请输入字典类型id' })
    }
    if (!body.name || !body.code) {
        return ctx.fail({ msg: "参数错误" })
    }
    const res = await service.update(body)
    if (res) {
        return ctx.success({ msg: "修改成功" })

    }
    return ctx.fail({ msg: "修改成功" })
});
/**
* @description 删除字典类型
*/
dictTypeController.delete('/delete', async (ctx) => {
    const body = await ctx.req.json()
    if (Array.isArray(body) && body.length) {
        const ret = await service.del(body)
        if (!ret) {
            return ctx.fail({ msg: "删除失败" })
        }
        return ctx.success({ msg: '删除成功' })
    }
})
export default dictTypeController;