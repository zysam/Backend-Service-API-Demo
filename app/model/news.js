module.exports = app => {
  const mongoose = app.mongoose
  const schema = new mongoose.Schema({
    newType: { type: String},
    title: { type: String},
    content: { type: String},
    isVerify: { type: Boolean}
  })
  schema.set('timestamps', true)
  schema.set('collection', 'news')

  return mongoose.model('News', schema)
}