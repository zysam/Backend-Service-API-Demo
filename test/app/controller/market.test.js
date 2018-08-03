'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/market.test.js', () => {

  it('should POST /api/markets', async () => {
    const ctx = app.mockContext()
    const data = {
      assetName: 'BTC',
      price: 60006
    }
    const {body} = await app.httpRequest()
      .post('/api/markets')
      .send(data)
      .expect(200)
    assert(body.data !== undefined)
    console.log('markets', body.data)
    const btcPrice = await ctx.service.cache.getMarketByAssetName(data.assetName)
    assert(Number(btcPrice) === data.price)
  })

  it('should GET /api/markets', async () => {
    const user = {
      mobile: '13800138112',
      username: '林先生',
      nickname: 'Sam',
      location: '广州珠江新城xx 2404',
      password: 'aaabbb'
    }
    await app.model.User.remove({mobile: user.mobile})
    const ctx = app.mockContext()
    await ctx.service.user.create(Object.assign({}, user))
    const {token} = await ctx.service.userAccess.login({
      mobile: user.mobile,
      password: user.password
    })

    const {body} = await app.httpRequest()
      .get('/api/markets')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
    console.log(body.data)
    assert(body.data !== undefined)
  })
})