'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  
  // user access
  router.post('/signup', controller.user.create)
  router.post('/login', controller.userAccess.login)
  router.get('/logout', app.jwt, controller.userAccess.logout)
  router.get('/api/users/access/current', app.jwt, controller.userAccess.current)
  router.put('/api/users/access/resetPsw', app.jwt, controller.userAccess.resetPsw)

  // user
  router.put('/api/users/access/:id', app.jwt, controller.userAccess.update)
  
  // mobile
  router.post('/api/phones/verify', controller.phone.sendVerifyCode)

  // user access news
  router.get('/api/news', app.jwt, controller.news.index)

  // admin
  router.post('/api/news', controller.news.create)
  router.put('/api/news/:_id', controller.news.update)

  // market
  router.post('/api/markets', controller.market.create)
  router.get('/api/markets', app.jwt, controller.market.index)
}
