'use strict'
const Controller = require('egg').Controller

class MarketController extends Controller {
  async index () {
    const {ctx} = this

    const res = await ctx.service.market.lastAssetByCache()
    
    ctx.helper.success({ ctx, res })
  }
  async create () {
    const {ctx} = this
    const data = ctx.request.body
    // TODO: validate
    const res = await ctx.service.market.create(data)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = MarketController
