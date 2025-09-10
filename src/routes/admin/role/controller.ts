import { Hono } from "hono";
import service from "./service.ts";

const roleController = new Hono()
/**
* @description 获取角色下拉列表
*/
roleController.get('/options', async (ctx) => {
    const data = await service.options();
    return ctx.success({
        data: data.map(ele => {
            return { value: ele.id, label: ele.name }
        })
    })
})


export default roleController   