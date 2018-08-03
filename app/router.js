'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  
  // userAccess
  router.post('/signup', controller.user.create)
  router.post('/login', controller.userAccess.login)
  router.get('/logout', app.jwt, controller.userAccess.logout)
  router.get('/api/users/access/current', app.jwt, controller.userAccess.current)
  router.put('/api/users/access/resetPsw', app.jwt, controller.userAccess.resetPsw)

  // user
  router.put('/api/users/access/:id', app.jwt, controller.userAccess.update)
  
  // mobile
  router.post('/api/phones/verify', controller.phone.sendVerifyCode)
}
