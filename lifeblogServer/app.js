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

require('./config/db')

// 路由
const lifeLogs = require('./routes/lifeLogs')


// error handler
onerror(app)

// middlewares
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

router.use(lifeLogs.routes(), lifeLogs.allowedMethods())

app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => { console.error('server error', err, ctx) });

module.exports = app
