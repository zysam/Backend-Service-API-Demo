'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/service/cache.test.js', () => {

  it('should saveMarket', async () => {
    const ctx = app.mockContext()
    const btc = {
      assetName: 'BTC',
      price: 60000
    }
    const r = await ctx.service.cache.saveMarket({[btc.assetName]: btc.price})
    console.log('r', r)
    const btcPrice = await ctx.service.cache.getMarketByAssetName(btc.assetName)
    assert(Number(btcPrice) === btc.price)
  })
  it('should getMarketByAssetName', async () => {
    const ctx = app.mockContext()
    const btc = {
      assetName: 'BTC',
      price: 60000
    }
    const btcPrice = await ctx.service.cache.getMarketByAssetName(btc.assetName)
    // const btcPrice = await ctx.redis.hget(btc.assetName)
    // console.log(btcPrice)
    assert(Number(btcPrice) === btc.price)
  })
  it('should getMarket', async () => {
    const ctx = app.mockContext()
    // const btc = {
    //   assetName: 'BTC',
    //   price: 60000
    // }

    const obj = {
      'ETH': 5000,
      'BTC': 60001,
      'EOS': 500
    }
    await ctx.service.cache.saveMarket(obj)

    const assets = await ctx.service.cache.getMarket()
    // const btcPrice = await ctx.redis.hget(btc.assetName)
    console.log('assets', assets)
    assert(typeof assets === 'object')
  })
})