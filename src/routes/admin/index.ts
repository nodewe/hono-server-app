import { Hono } from 'hono'

import userController from './user/controller.ts'

import menuController from "./menu/controller.ts"

import fileContrller from "./file/controller.ts"

import authController from "./auth/controller.ts"

import roleController from "./role/controller.ts"


const admin = new Hono()


admin.route('/user', userController)
admin.route('/menu', menuController)
admin.route('/file',fileContrller)
admin.route('/auth',authController)
admin.route('/role',roleController)


export default admin