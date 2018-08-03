'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/news.test.js', () => {
  let NEWS_DATA = {}
  before(async () => {
    await app.model.User.remove({})
    await app.model.News.remove({})
  })

  it('should POST /api/news', async () => {
    // const ctx = app.mockContext()
    const data = {
      newsType: 'bulletin',
      title: 'test',
      content: 'this is a test'
    }
    const {body} = await app.httpRequest()
      .post('/api/news')
      .send(data)
      .expect(200)
    assert(body.data.newsType === data.newsType)
    NEWS_DATA = body.data
  })
  it('should PUT /api/news', async () => {
    
    const data = {
      title: 'test modify',
      content: 'this is a test will modify'
    }
    const {body} = await app.httpRequest()
      .put('/api/news/' + NEWS_DATA._id)
      .send(data)
      .expect(200)
    assert(body.data.title === data.title)
  })
  it('should GET /api/news', async () => {
    const user = {
      mobile: '13800138111',
      username: '林先生',
      nickname: 'Sam',
      location: '广州珠江新城xx 2404',
      password: 'aaabbb'
    }
    const ctx = app.mockContext()
    await ctx.service.user.create(Object.assign({}, user))
    const {token} = await ctx.service.userAccess.login({
      mobile: user.mobile,
      password: user.password
    })
    const {body} = await app.httpRequest()
      .get('/api/news?newType=bulletin')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
    // console.log(body)
    assert(body.data)
  })
})
