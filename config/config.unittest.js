module.exports = appInfo => {
  const config = exports = {}


  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:8000' ],
  }

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/wallet-test',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  config.jwt = {
    secret: 'demo-api-test',
    // enable: true, // default is false
    // match: '/jwt', // optional
  }

  return config
}
