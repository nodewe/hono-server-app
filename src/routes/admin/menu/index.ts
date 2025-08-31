
import { Hono } from "hono";

const menu = new Hono();

menu.get('/listOptions',(ctx)=>{
    return  ctx.json({
        code:200,
        data:[
            {label:"首页",value:"home"},
            {label:"用户管理",value:"user"},
            {label:"权限管理",value:"permission"},
            {label:"角色管理",value:"role"},
            {label:"菜单管理",value:"menu"},
            {label:"日志管理",value:"log"},
            {label:"系统设置",value:"system"},
        ]
    })
})


export default menu;