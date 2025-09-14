import { Hono } from "hono";
import {
    deleteCookie,
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    generateCookie,
    generateSignedCookie,
  } from 'hono/cookie'
import { mathCaptchaGenerator } from '@/utils/captcha.ts';
const authController = new Hono();

/**
* @description 获取验证码
*/
authController.get('/captcha', async (ctx) => {

const captcha = mathCaptchaGenerator.generate({
    noiseLevel: 4,
    color: true,
    difficulty:'easy'
  });
    // const captcha = generateCaptcha()
    // console.log(captcha,'111')
    const text = captcha.answer.toString()
    //设置session
    setCookie(ctx, 'captcha',text )
    const data = {
        captcha: captcha.data,
        text: text
    };
    return ctx.success({ data })
})


export default authController;