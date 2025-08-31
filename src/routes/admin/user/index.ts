import { Hono } from 'hono'


const user = new Hono()
//获取个人用户列表
user.get('/page',(ctx)=>{
    return ctx.text("获取个人用户列表")
});


//获取个人信息
user.get("/info",(ctx)=>{
    return ctx.text("获取个人信息")
})
/**
* @description 添加用户
*/
user.post("/add",async (ctx)=>{
    // console.log(ctx.req.jso)
    const body = await ctx.req.json()
    console.log(body,'body')
    return ctx.json({
        code:200,
        data:"添加用户成功"
    })
})

export default user