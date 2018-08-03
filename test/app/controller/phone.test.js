'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/phone.test.js', () => {

  it('should POST /api/phones/verify', async () => {
    const ctx = app.mockContext()
    const mobile = '13800138001'
    await app.httpRequest()
      .post('/api/phones/verify')
      .send({mobile})
      .expect(200)
    const code = await ctx.service.cache.getVerifyCode(mobile)
    console.log('code', code)
    assert(code !== undefined)
  })
})