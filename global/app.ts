// 在文件顶部导入 Hono 类型
import { Hono, Context } from 'hono'

// 声明全局变量类型扩展（或在 types/global.d.ts 中声明）
declare module 'hono' {
  interface Context {
    success: (params: { code?: number; data?: any; msg?: string }) => void,
    fail: (params: { code?: number; data?: any; msg?: string }) => void;
    //属性添加
    session: {
      //验证码数据
      captcha?:string
    };
    // 上下文状态
    state: {
      userInfo:any
    };
  }
}


declare global {
  interface  queryResult {
    
  }
}