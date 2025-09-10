import { Hono } from 'hono'
import service from "./service.ts"
import jwt from "jsonwebtoken"
import { jwtConfig } from "@/config/index.ts"
const user = new Hono();

/**
* @description 添加用户
*/
user.post("/add", async (ctx) => {
    // console.log(ctx.req.jso)
    const body = await ctx.req.json()
    // console.log(body, '添加')
    await service.add()
    return ctx.success({ msg: "添加用户成功" })
});

/**
* @description 登录
*/
user.post("/login", async (ctx) => {
    const body = await ctx.req.json();
    console.log(body, '登录');
    if (!body.username || !body.password) {
        return ctx.fail({ msg: "参数错误" })
    }
    const captcha = ctx.session.captcha
    if(body.captcha !== captcha){
        return ctx.fail({ msg: "验证码错误" })
    }
    // console.log(body, '登录')
    const info = await service.login(body.username, body.password);

    if(!info){
        return ctx.fail({ msg: "用户不存在" })
    }
    //生成token
    //@ts-ignore
    const token = jwt.sign({id:info.id},jwtConfig.secret,{expiresIn:jwtConfig.expiresIn})

    const data = {
        token
    }
    return ctx.success({data})
});

//获取当前用户信息
user.get("/me", async (ctx) => {
    // const body = await ctx.req.json()
    // console.log(ctx.state.userInfo, '获取当前用户信息')
    return ctx.success({data: ctx.state.userInfo})
});


//获取个人用户列表
user.get('/page', async (ctx) => {
    const query = await ctx.req.query()
    // console.log(body, '用户列表')
    let page = 1,
        size = 10;
    if (query.pageNum) {
        page = +query.pageNum || page
    }
    if (query.pageSize) {
        size = +query.pageSize || size
    }

    const userList = await service.page(page, size)
    // console.log(userList,'userList')
    return ctx.success({ data: userList, msg: "成功" })
    // return ctx.text("获取个人用户列表")
});


//获取个人信息 根据id
user.get("/info", async (ctx) => {
    const params = await ctx.req.query()
    if (!params.id) {
        return ctx.fail({ msg: "参数错误" })
    }
    const info = await service.info(+params.id);
    if (!info) {
        return ctx.fail({ msg: "用户不存在" })
    }
    return ctx.success({ data: info, msg: "成功" })
});

// 修改用户
user.put("/update", async (ctx) => {
    const body = await ctx.req.json()
    console.log(body, '修改')
    return ctx.text("修改用户")
});

// 删除用户
user.delete("/delete", async (ctx) => {
    const body = await ctx.req.json()
    console.log(body, '删除')
    if (Array.isArray(body) && body.length) {

        return ctx.json({
            code: 200,
            data: "删除用户成功"
        })
    }

    throw Error("参数错误")
});


export default user