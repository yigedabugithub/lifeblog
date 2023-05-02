const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: String,//标题
  content: String,//内容
  avatar: String,//头像
  createTime: { type: Date, default: Date.now() },//创建时间
  updateTime: { type: Date, default: Date.now() },//更新时间 
  remark: String
})

module.exports = mongoose.model("articles", articleSchema, "articles")//model名称 模型 数据库集合名称