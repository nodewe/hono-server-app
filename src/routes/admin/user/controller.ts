import { Hono } from 'hono'
import service from "./service.ts"
import jwt from "jsonwebtoken"
import {
    deleteCookie,
    getCookie,
  } from 'hono/cookie'
import { jwtConfig } from "@/config/index.ts"
import dayjs from 'dayjs'
const user = new Hono();

/**
* @description 添加用户
*/
user.post("/add", async (ctx) => {
    // console.log(ctx.req.jso)
    const body = await ctx.req.json()
    // console.log(body, '添加')
    if (!body.username) {
        return ctx.fail({ msg: "用户名不能为空" })
    }
    if (!body.nickname) {
        return ctx.fail({ msg: "昵称不能为空" })
    }
    if (Array.isArray(body.roleIds) && !body.roleIds.length) {
        return ctx.fail({ msg: "请选择角色" })
    }
    if (!body.deptId) {
        // return ctx.fail({ msg: "请选择部门" })
    }
    if (!body.mobile) {
        return ctx.fail({ msg: "手机号不能为空" })
    }
    //随机生成密码
    body.password = Math.random().toString(36).substr(2, 10);
    // 删除
    body.deleted = 0;

    const user = {
        username: body.username || "",
        nickname: body.nickname || "",
        avatar: body.avatar || "",
        deptId: body.deptId || "",
        mobile: body.mobile || "",
        email: body.email || "",
        password: body.password,
        createTime:dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updateTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
    };
    const isOk = await service.add(user, body.roleIds)
    if (isOk) {
        return ctx.success({ msg: "添加用户成功" })

    }
    return ctx.fail({ msg: "添加失败" })
});

/**
* @description 登录
*/
user.post("/login", async (ctx) => {
    const body = await ctx.req.json();
    // console.log(body, '登录');
    if (!body.username || !body.password) {
        return ctx.fail({ msg: "参数错误" })
    }
    const captcha = getCookie(ctx)

    // console.log(captcha,'验证码')
    // if (body.captcha !== captcha.captcha) {
    //     deleteCookie(ctx,'capcha')
    //     return ctx.fail({ msg: "验证码错误" })
    // }
    // deleteCookie(ctx,'capcha')
    // console.log(body, '登录')
    const info = await service.login(body.username, body.password);

    if (!info) {
        return ctx.fail({ msg: "用户不存在" })
    }
    //生成token
    //@ts-ignore
    const token = jwt.sign({ id: info.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })

    const data = {
        token
    }
    return ctx.success({ data })
});

//获取当前用户信息
user.get("/me", async (ctx) => {
    // const body = await ctx.req.json()
    // console.log(ctx.state.userInfo, '获取当前用户信息')
    return ctx.success({ data: ctx.state.userInfo })
});

/**
* @description 修改用户状态
*/
user.put("/status",async (ctx) => {
    const body = await ctx.req.json();
    // console.log(body, '修改用户状态')
    if (!body.userId) {
        return ctx.fail({ msg: "参数错误" })
    }

    const statusOptions = [0,1]
    if(!statusOptions.includes(body.status)){
        return ctx.fail({ msg: "参数错误" })
    }
    const isOk = await service.changeStatus(body.userId, body.status)
    if (!isOk) {
        return ctx.fail({ msg: "修改失败" })
    }
    return ctx.success({ msg: "修改用户状态成功" })
});

/**
* @description 重置密码
*/
user.put("/resetPassword", async (ctx) => { 
    const body = await ctx.req.json();
    // console.log(body, '重置密码')
    if (!body.userId) {
        return ctx.fail({ msg: "参数错误" })
    }
    if (!body.password) {
        return ctx.fail({ msg: "参数错误" })
    }
    const isOk = await service.resetPassword(body.userId,body.password)
    if (!isOk) {
        return ctx.fail({ msg: "重置密码失败" })
    }
    return ctx.success({ msg: "重置密码成功" })
})


//获取个人用户列表
user.get('/page', async (ctx) => {
    const query =  ctx.req.query()
    // console.log(body, '用户列表')
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
    if(query.keywords){
        keywords = query.keywords
    }
    if(query.status){
        status = query.status
    }

    const userList = await service.page(page, size,keywords,status)
    // console.log(userList,'userList')
    return ctx.success({ data: userList, msg: "成功" })
    // return ctx.text("获取个人用户列表")
});


//获取个人信息 根据id
user.get("/info", async (ctx) => {
    const params = await ctx.req.query()
    if (!params.userId) {
        return ctx.fail({ msg: "参数错误" })
    }
    const info = await service.info(+params.userId);
    if (!info) {
        return ctx.fail({ msg: "用户不存在" })
    }
    return ctx.success({ data: info, msg: "成功" })
});

// 修改用户
user.put("/update", async (ctx) => {
    const body = await ctx.req.json()
    if (!body.id) {
        return ctx.fail({ msg: "用户参数错误" })
    }
    if (!body.username) {
        return ctx.fail({ msg: "用户名不能为空" })
    }
    if (!body.nickname) {
        return ctx.fail({ msg: "昵称不能为空" })
    }
    if (Array.isArray(body.roleIds) && !body.roleIds.length) {
        return ctx.fail({ msg: "请选择角色" })
    }
    if (!body.deptId) {
        // return ctx.fail({ msg: "请选择部门" })
    }
    if (!body.mobile) {
        return ctx.fail({ msg: "手机号不能为空" })
    }
    delete body.password
    body.updateTime =  dayjs().format('YYYY-MM-DD HH:mm:ss')
    const isOk = await service.update(body, body.roleIds);
    if (!isOk) {
        return ctx.fail({ msg: "修改失败" })
    }
    return ctx.success({ msg: "修改用户成功" })
});

// 删除用户
user.delete("/delete", async (ctx) => {
    const body = await ctx.req.json()
    if (Array.isArray(body) && body.length) {
        const ret = await service.del(body)
        if (!ret) {
            return ctx.fail({ msg: "删除失败" })
        }
        return ctx.json({
            code: 200,
            data: "删除用户成功"
        })
    }

    throw Error("参数错误")
});


export default user