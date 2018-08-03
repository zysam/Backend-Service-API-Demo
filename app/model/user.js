module.exports = app => {
  const mongoose = app.mongoose
  const schema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    location: { type: String, required: true},
    nickname: { type: String, required: true },
  })
  schema.set('timestamps', true)
  schema.set('collection', 'users')
  return mongoose.model('User', schema)
}
