import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import fs from 'fs/promises'
import dayjs from "dayjs"
dayjs.locale('zh-cn')
import { HTTPException } from 'hono/http-exception'
import { serveStatic } from '@hono/node-server/serve-static'
import {ensureDirForFile} from "./utils/index.ts"
import os from "os"
import adminRouter from "./routes/admin/index.ts"

import dotenv from 'dotenv'
const nodeEnv = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${nodeEnv}` })

const app = new Hono()

// app.use(ctxMiddleware)

//静态托管
app.use('/static/*', serveStatic({ rewriteRequestPath(path, c) {
  //路径重写
  const path1 =  path.replace(/^\/static/, 'uploads')
  // console.log(path1,'path')
  return path1
}, }));


app.get('/', (c) => {
  return c.text('Hello Hono!')
})



app.route('/admin',adminRouter)

// 监听全局错误
app.onError(async (err,ctx)=>{
  // console.log(err,'')
  const method = ctx.req.method
  const url = ctx.req.url
  const curTime = dayjs()
  const LOG_PATH = `logs/${curTime.format('YYYY-MM-DD')}-error.log`;
  await ensureDirForFile(LOG_PATH)

  fs.appendFile(LOG_PATH,`[${curTime.format('HH:mm:ss')}] ${method} ${url} ERROR - \n ${err.stack} \n`)

  console.log(process.env.NODE_ENV,'env')

  
  // if(process.env.NODE_ENV === 'PROD'){
  //   return ctx.text('internal server error')
  // }

  // console.log(err.stack,'stack')
  return ctx.json({
    code:500,
    msg:err.message
  });
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  //列举本机所有ip
  const wlan = os.networkInterfaces().WLAN;
  console.log(`Server is running on http://localhost:${info.port}`)
  wlan?.forEach(ipItem=>{
    if(ipItem.family==='IPv4'){
      console.log(`Server is running on http://${ipItem.address}:${info.port}`)
    }
    // console.log(`http://${ipItem.address}:${info.port}`)
  });

 
});


