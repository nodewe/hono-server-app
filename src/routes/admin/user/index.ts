import { Hono } from 'hono'
import service from "./service.ts"

const user = new Hono();

/**
* @description 添加用户
*/
user.post("/add",async (ctx)=>{
    // console.log(ctx.req.jso)
    const body = await ctx.req.json()
    console.log(body,'添加')
    await service.add()
    return ctx.json({
        code:200,
        data:"添加用户成功"
    })
});

/**
* @description 登录
*/
user.post("/login",async (ctx)=>{
    const body = await ctx.req.json()
    console.log(body,'登录')
    return ctx.json({
        code:200,
        data:"登录成功"
    })
});

//获取当前用户信息
user.get("/me",async(ctx)=>{
    const body = await ctx.req.json()
    console.log(body,'获取当前用户信息')
    return ctx.json({
        code:200,
        data:"获取当前用户信息成功"
    })
});


//获取个人用户列表
user.get('/page',async(ctx)=>{
    const body = await ctx.req.json()
    console.log(body,'用户列表')
    return ctx.text("获取个人用户列表")
});


//获取个人信息 根据id
user.get("/info",async (ctx)=>{
    const body = await ctx.req.json()
    console.log(body,'个人信息')
    return ctx.text("获取个人信息根据id")
});

// 修改用户
user.put("/update",async(ctx)=>{
    const body = await ctx.req.json()
    console.log(body,'修改')
    return ctx.text("修改用户")
});

// 删除用户
user.delete("/delete",async(ctx)=>{
    const body = await ctx.req.json()
    console.log(body,'删除')
    if(Array.isArray(body) && body.length){
        
        return ctx.json({
            code:200,
            data:"删除用户成功"
        })
    }
    
    throw Error("参数错误")
});


export default user