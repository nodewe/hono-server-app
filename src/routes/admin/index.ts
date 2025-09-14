import { Hono } from 'hono'
//用户
import userController from './user/controller.ts'
//菜单
import menuController from "./menu/controller.ts"
//文件
import fileContrller from "./file/controller.ts"
//授权
import authController from "./auth/controller.ts"
//角色
import roleController from "./role/controller.ts"
//部门
import deptController from "./dept/controller.ts"
//字典类型
import dictTypeController from "./dictType/controller.ts"

const admin = new Hono()


admin.route('/user', userController)
admin.route('/menu', menuController)
admin.route('/file',fileContrller)
admin.route('/auth',authController)
admin.route('/role',roleController)
admin.route('/dept',deptController)
admin.route('/dictType',dictTypeController)


export default admin