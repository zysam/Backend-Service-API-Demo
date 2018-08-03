'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/user.test.js', () => {
  before(async () => {
    // const mongoose = app.mongoose
    await app.model.User.remove({})
  })
  const user = {
    mobile: '13800138000',
    username: '陈先生',
    nickname: 'chen',
    location: '广州珠江新城xx 2403',
    password: '123456'
  }
  let Token = ''

  it('should POST /signup', async () => {
    const ctx = app.mockContext()
    const r = await ctx.service.cache.setVerifyCode(user.mobile)
    const code = await ctx.service.cache.getVerifyCode(user.mobile)
    // console.log('set key', r, 'code', code)
    user.verifyCode = String(code)
    const {body} = await app.httpRequest()
      .post('/signup')
      .send(user)
      .expect(200)
    // console.log(body)
    assert(body.code === 0)
    assert(body.data.mobile === user.mobile)
  })
  it('should POST /login', async () => {
    const {body} = await app.httpRequest()
      .post('/login')
      .send({mobile: user.mobile, password: user.password})
      .expect(200)
    
    // console.log(body)
    assert(body.data.token.length > 10)
    Token = body.data.token
  })
  it('should POST /api/users/access/resetPsw', async () => {
    const {body} = await app.httpRequest()
      .put('/api/users/access/resetPsw')
      .set('Authorization', 'Bearer ' + Token)
      .send({password: '999990', oldPassword: user.password})
      .expect(200)
    // console.log(body)
    assert(body.code === 0)
  })
})
