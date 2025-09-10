/**
* @description 通用中间件
*/
export const commonMiddleware = async (c: any, next: any) => {
    /**
    * @description 上下文加入成功响应
    */
    c.success = ({ code = 200, data = null, msg = "请求成功" }) => {
        return c.json({
            code,
            msg,
            data
        });
    }

    /**
    * @description 加入失败响应
    */
    c.fail = ({ code = 500, data = null, msg = "请求失败" }) => {
        return c.json({
            code,
            msg,
            data
        });
    }
    await next()
}