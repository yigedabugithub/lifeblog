const router = require('koa-router')()
const util = require('../utils/util')
const Article = require('../models/articleSchema')
router.prefix('/life')


// logs博客列表
router.get('/articles', async (ctx) => {
    const { page, skipIndex } = util.pager(ctx.request.query)

    try {
        const res = await Article.find({}).skip(skipIndex).limit(page.pageSize)
        ctx.body = util.success({ list: res, total: 13 }, '列表获取成功')

    } catch (e) {
        console.log(e)
    }
})


module.exports = router
