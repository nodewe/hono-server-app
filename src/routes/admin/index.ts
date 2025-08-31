import { Hono } from 'hono'

import user from './user/index.ts'

import menu from "./menu/index.ts"

import file from "./file/index.ts"

const admin = new Hono()


admin.route('/user', user)
admin.route('/menu', menu)
admin.route('/file',file)


export default admin