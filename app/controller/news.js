'use strict'
const Controller = require('egg').Controller

class NewsController extends Controller {
  async index () {
    const {ctx} = this

    const query = ctx.query
    const res = await ctx.model.News.find({newType: query.newsType, isValid: true}).limit(query.limit || 5).skip(query.page || 0).sort('_id')
    
    ctx.helper.success({ ctx, res })
  }
  async create () {
    const {ctx} = this
    const data = ctx.request.body
    // TODO: validate
    const res = await ctx.model.News.create(data)
    ctx.helper.success({ ctx, res })
  }
  async update () {
    const {ctx} = this
    const _id = ctx.params._id
    const data = ctx.request.body
    // TODO: validate
    const res = await ctx.model.News.findByIdAndUpdate(_id, data, {new: true})
    ctx.helper.success({ ctx, res })
  }
}

module.exports = NewsController
