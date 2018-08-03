const Service = require('egg').Service

class UserService extends Service {
  // create======================================================================================================>
  async create(payload) {
    const { ctx, service } = this

    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model.User.create(payload)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.User.findByIdAndUpdate(_id, payload)
  }

  // Commons======================================================================================================>
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({mobile: mobile})
  }

  async find(id) {
    return this.ctx.model.User.findById(id)
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values)
  }

}


module.exports = UserService