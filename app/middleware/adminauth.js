module.exports = options => {
    return async function adminauth(ctx,next) {
        ctx.body = {code:-1,data:"未登录"}
        // if(ctx.session.openId) {
        //     await next()
        // } else {
        //     ctx.body = {code:-1,data:"未登录"}
        // }
    }
}