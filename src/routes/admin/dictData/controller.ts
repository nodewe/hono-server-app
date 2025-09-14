import { Hono } from "hono";
import service from "./service.ts";
import dayjs from "dayjs";


const dictDataController = new Hono();


/**
* @description 获取字典数据分页列表
*/
dictDataController.get('/page', async (ctx) => {
    const query = ctx.req.query()
    let page = 1,
        size = 10,
        keywords = '',
        typeCode = '';
    if (query.pageNum) {
        page = +query.pageNum || page
    }
    if (query.pageSize) {
        size = +query.pageSize || size
    }
    // 关键字
    if (query.name) {
        keywords = query.name
    }
    if(query.typeCode){
        typeCode = query.typeCode
    }

    const dictTypeList = await service.page(page, size, keywords,typeCode)
    // console.log(userList,'userList')
    return ctx.success({ data: dictTypeList, msg: "成功" })
});

/**
* @description 获取字典类型详情
*/
dictDataController.get('/info', async (ctx) => {
    const params = ctx.req.query()
    if (!params.dictDataId) {
        return ctx.fail({ msg: "参数错误" })
    }
    const info = await service.info(+params.dictDataId);
    if (!info) {
        return ctx.fail({ msg: "字典类型不存在" })
    }
    return ctx.success({ data: info, msg: "成功" })
})

/**
* @description 添加
*/

dictDataController.post('/add', async (ctx) => {
    const body = await ctx.req.json()
   
    if (!body.name || !body.value || !body.typeCode) {
        return ctx.fail({ msg: "参数错误" })
    }
    body.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
    body.createTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
    
    const res = await service.add(body)
    if (res) {
        return ctx.success({ msg: "添加成功" })

    }
    return ctx.fail({ msg: "添加成功" })
})

/**
* @description 修改

*/
dictDataController.put('/update', async (ctx) => {
    const body = await ctx.req.json()
    if (!body.id) {
        return ctx.fail({ msg: '请输入字典类型id' })
    }
    if (!body.name || !body.value) {
        return ctx.fail({ msg: "参数错误" })
    }
    body.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss")

    const res = await service.update(body)
    if (res) {
        return ctx.success({ msg: "修改成功" })

    }
    return ctx.fail({ msg: "修改成功" })
});
/**
* @description 删除字典类型
*/
dictDataController.delete('/delete', async (ctx) => {
    const body = await ctx.req.json()
    if (Array.isArray(body) && body.length) {
        const ret = await service.del(body)
        if (!ret) {
            return ctx.fail({ msg: "删除失败" })
        }
        return ctx.success({ msg: '删除成功' })
    }
})
export default dictDataController;