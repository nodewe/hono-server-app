import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import fs from 'fs/promises'
import { HTTPException } from 'hono/http-exception'
import { serveStatic } from '@hono/node-server/serve-static'

import { logger } from 'hono/logger'
import os from "os"
import adminRouter from "./routes/admin/index.ts"
const app = new Hono()

//静态托管
app.use('/static/*', serveStatic({ rewriteRequestPath(path, c) {
  //路径重写
  const path1 =  path.replace(/^\/static/, 'uploads')
  // console.log(path1,'path')
  return path1
}, }))


app.get('/', (c) => {
  return c.text('Hello Hono!')
})



app.route('/admin',adminRouter)

// 监听全局错误
app.onError((err, c) => {
  console.error(err)
  return c.text('Error', 500)
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


