const Service = require('egg').Service

class MarketService extends Service {

  async create (data) {
    const markets = await this.ctx.model.Market.create([data])
    // console.log('==', markets)
    if (markets.length >= 1) {
      let obj = {}
      for (let m of markets) {
        obj[m.assetName] = m.price
      }
      this.ctx.logger.debug('market create', obj)
      await this.ctx.service.cache.saveMarket(obj)
    }
    return markets
  }

  async lastAssetByCache () {
    return this.ctx.service.cache.getMarket()
  }
}


module.exports = MarketService