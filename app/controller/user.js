'use strict'
const Controller = require('egg').Controller

class UserController extends Controller {

  constructor(ctx) {
    super(ctx)

    this.UserCreateTransfer = {
      mobile: {type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/},
      verifyCode: {type: 'string', required: true},
      password: {type: 'password', required: true, allowEmpty: false, min: 6},
      username: {type: 'string', required: true, allowEmpty: false},
      nickname: {type: 'string', required: true, allowEmpty: false},
      location: {type: 'string', required: true, allowEmpty: false}
    }

  }
  
  async create() {
    const { ctx, service } = this
    ctx.validate(this.UserCreateTransfer)
    const payload = ctx.request.body || {}
    const code = await service.cache.getVerifyCode(payload.mobile)
    if (code !== payload.verifyCode) {
      ctx.throw(400, 'verifyCode is invail')
    }
    delete payload.verifyCode
    const res = await service.user.create(payload)
    ctx.helper.success({ctx, res})
  }

}

module.exports = UserController
