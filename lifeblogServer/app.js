const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt')
const log4js = require('./utils/log4js')
const router = require('koa-router')()
const cors = require('koa2-cors'); //跨域处理
const sslify = require('koa-sslify').default;


require('./config/db')

// 路由
const articles = require('./routes/articles')
const home = require('./routes/home')


// error handler
onerror(app)

// middlewares
app.use(sslify());
app.use(
    cors({
        origin: function (ctx) { //设置允许来自指定域名请求
            const whiteList = ['http://power-admin.tech', 'http://123.56.216.221:1080', 'http://127.0.0.1:1080',]; //可跨域白名单
            let url = ctx.header.referer?.slice(0, ctx.header.referer.length - 1);
            if (whiteList.includes(url)) {
                return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
            }
            return 'http://localhost:3000' //默认允许本地请求3000端口可跨域
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', { extension: 'pug' }))

// logger
app.use(async (ctx, next) => {
    log4js.info(`get params:${JSON.stringify(ctx.request.query)}`)
    log4js.info(`post params:${JSON.stringify(ctx.request.body)}`)
    await next()
})

// routes
router.prefix("/api")

router.use(articles.routes(), articles.allowedMethods())
router.use(home.routes(), home.allowedMethods())

app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => { console.error('server error', err, ctx) });

module.exports = app
