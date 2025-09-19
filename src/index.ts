import { serve } from "@hono/node-server";
import { Hono } from "hono";
// import { session } from 'hono-session/src/index.js'
import dayjs from "dayjs";
dayjs.locale("zh-cn");
import { commonMiddleware, jwtMiddleware } from "./middleware/index.ts";
// import { HTTPException } from "hono/http-exception";
import { serveStatic } from "@hono/node-server/serve-static";
import {  errorCollector } from "./utils/index.ts";
import os from "os";
import adminRouter from "./routes/admin/index.ts";
import dotenv from "dotenv";
import { whiteList } from "./config/index.ts";
import { createNodeWebSocket } from '@hono/node-ws'

const nodeEnv = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${nodeEnv}` });

const app = new Hono();

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

app.use("*", commonMiddleware);
// 登录验证
app.use("*", async (ctx: any, next: any) => {
    console.log(ctx.req.path, 'ctx.req.path')
  //白名单
  if (whiteList.includes(ctx.req.path)) {
    return await next();
  }
  return await jwtMiddleware(ctx, next);
});

//静态托管
app.use(
  "/static/*",
  serveStatic({
    rewriteRequestPath(path, c) {
      //路径重写
      const path1 = path.replace(/^\/static/, "uploads");
      // console.log(path1,'path')
      return path1;
    },
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

//ws 连接
app.get('/ws', upgradeWebSocket((c) => {
  return {
    onOpen: (evt, ws) => {
      console.log('ws open')
      ws.send('Hello from Hono WebSocket!')
    },
    onMessage: (evt, ws) => {
      
      console.log('ws message:', evt.data)
       const wsData = JSON.stringify(evt.data) 
       // data 数据类型
       const  data = JSON.parse(wsData) as {
        // 命令类型
        cmd:string,
        // 携带的数据
        data:any
       }

       console.log(data,'data')
      ws.send(`Echo: ${evt.data}`)
    },
    //关闭
    onClose(evt, ws) {
      console.log(evt, 'ws close')
    },
    onError(evt, ws) {
      console.log(evt, 'ws error')
    },
  }
}))

app.route("/admin", adminRouter);

// 监听全局错误
app.onError(async (err, ctx) => {
  errorCollector(err,ctx)
  return ctx.json({
    code: 500,
    msg: err.message,
  });
});

// const server = createServer(app.fetch)

const server = serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    //列举本机所有ip
    const wlan = os.networkInterfaces().WLAN;
    console.log(`Server is running on http://localhost:${info.port}`);
    wlan?.forEach((ipItem) => {
      if (ipItem.family === "IPv4") {
        console.log(
          `Server is running on http://${ipItem.address}:${info.port}`
        );
      }
    });
  }
);

injectWebSocket(server)