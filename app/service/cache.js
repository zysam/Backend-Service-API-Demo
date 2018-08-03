const Service = require('egg').Service
const PREFIX = 'CODE-'
const MARKET_KEY = 'hash_market'
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

  async saveMarket (obj) {
    // const val = {
    //   result: data,
    //   time: Date.now()
    // }
    const r = await this.app.redis.hmset(MARKET_KEY, obj)
    return r
  }
  async getMarketByAssetName (assetName) {
    return await this.app.redis.hget(MARKET_KEY, assetName)
  }
  async getMarket () {
    return await this.app.redis.hgetall(MARKET_KEY)
  }
}

module.exports = CacheService