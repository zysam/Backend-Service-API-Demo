'use strict'
const Controller = require('egg').Controller

class UserAccessController extends Controller {

  constructor(ctx) {
    super(ctx)

    this.UserLoginTransfer = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false }
    }

    this.UserResetPswTransfer = {
      password: { type: 'password', required: true, allowEmpty: false, min: 6 },
      oldPassword: { type: 'password', required: true, allowEmpty: false, min: 6 }
    }

    this.UserUpdateTransfer = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      nickname: {type: 'string', required: true, allowEmpty: false}
    }
  }

  async login() {
    const { ctx, service } = this
    ctx.validate(this.UserLoginTransfer)
    const payload = ctx.request.body || {}
    const res = await service.userAccess.login(payload)
    ctx.helper.success({ctx, res})
  }

  async logout() {
    const { ctx, service } = this
    await service.userAccess.logout()
    ctx.helper.success({ctx})
  }


  // 修改用户
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.UserUpdateTransfer)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.user.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
  
  async resetPsw() {
    const { ctx, service } = this
    ctx.validate(this.UserResetPswTransfer)
    const payload = ctx.request.body || {}
    await service.userAccess.resetPsw(payload)
    ctx.helper.success({ctx})
  }

  async current() {
    const { ctx, service } = this
    const res = await service.userAccess.current()
    ctx.helper.success({ctx, res})
  }

  async resetSelf() {
    const {ctx, service} = this
    ctx.validate(this.UserUpdateTransfer)
    const payload = ctx.request.body || {}
    await service.userAccess.resetSelf(payload)
    ctx.helper.success({ctx})
  }

}

module.exports = UserAccessController
