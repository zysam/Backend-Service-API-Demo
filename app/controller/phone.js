'use strict'
const Controller = require('egg').Controller

class PhoneController extends Controller {
  async sendVerifyCode () {
    const validSchema = {
      mobile: {type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/}
    }
    const { ctx, service } = this
    ctx.validate(validSchema)
    const {mobile} = ctx.request.body
    const code = await service.cache.setVerifyCode(mobile)
    // TODO: Send sms to mobile
    ctx.logger.info('sms verify code: ', mobile, code)
    ctx.helper.success({ctx})
  }
}

module.exports = PhoneController