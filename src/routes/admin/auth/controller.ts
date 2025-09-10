import { Hono } from "hono";
import svgCaptcha from 'svg-captcha';
const authController = new Hono();

/**
* @description 获取验证码
*/
authController.get('/captcha', async (ctx) => {
    const captcha = svgCaptcha.createMathExpr({
        width: 115,
        height: 48,
        noise: 5,
        background: '#c6c8c6'
    });
    //设置session
    ctx.session.captcha = captcha.text;
    const data = {
        captcha: captcha.data,
        text: captcha.text
    };
    return ctx.success({ data })
})


export default authController;