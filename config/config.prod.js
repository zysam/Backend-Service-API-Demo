module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513779989145_8890'

  config.logger = {
    level: 'DEBUG',
  }

  // add your config here
  config.middleware = [ 'errorHandler' ]


  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:8000' ],
  }

  // config.multipart = {
  //   fileExtensions: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov' ],
  // },

  config.bcrypt = {
    saltRounds: 10 // default 10
  }

  config.mongoose = {
    url: 'mongodb://mongo:27017/bs-api-demo',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  config.jwt = {
    secret: 'api-demo',
    // enable: true, // default is false
    // match: '/jwt', // optional
  }

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: 'redis',   // Redis host
      password: '',
      db: 0,
    },
  }

  return config
}
