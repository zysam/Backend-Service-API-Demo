const moment = require('moment')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = 'success' })=> {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.genRandomCode = (n = 4) => {
  let s = ''
  while (n--) {
    s += String(Math.floor(Math.random() * 10))
  }
  return s
}
