const Service = require('egg').Service
const PREFIX = 'CODE-'

class CacheService extends Service {
  async setVerifyCode (phone) {
    const code = this.ctx.helper.genRandomCode()
    const expired = 60 * 1000 * 1000 // 1 min
    const r = await this.app.redis.set(PREFIX + phone, code, 'EX', expired)
    return r
  }
  async getVerifyCode (phone) {
    const r = await this.app.redis.get(PREFIX + phone)
    return r
  }
}

module.exports = CacheService