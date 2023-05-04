const router = require('koa-router')()
const util = require('../utils/util')
router.prefix('/life')


// home
router.get('/home', async (ctx) => {

    try {
        ctx.body = util.success({
            fieldList: [
                {
                    name: '前端',
                    img: 'https://i.postimg.cc/52vXt6rw/image.png',
                },
                {
                    name: '烹饪',
                    img: 'https://i.postimg.cc/XvbpBnMt/image.png',
                },
                {
                    name: '养宠',
                    img: 'https://i.postimg.cc/SNHXqWgS/image.png',
                },
                {
                    name: '前端',
                    img: 'https://i.postimg.cc/52vXt6rw/image.png',
                },
                {
                    name: '烹饪',
                    img: 'https://i.postimg.cc/XvbpBnMt/image.png',
                },
                {
                    name: '养宠',
                    img: 'https://i.postimg.cc/SNHXqWgS/image.png',
                },

            ],
            hotArticles: [
                {
                    image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
                    title: '昨夜星辰昨夜风，画楼西畔桂堂东',
                },
                {
                    image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
                    title: '身无彩凤双飞翼，心有灵犀一点通',
                },

                {
                    image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
                    title: '身无彩凤双飞翼，心有灵犀一点通',
                },
                {
                    image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                    title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
                },
            ]
        })

    } catch (e) {
        console.log(e)
    }
})


module.exports = router
