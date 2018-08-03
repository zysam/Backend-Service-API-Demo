module.exports = app => {
  const mongoose = app.mongoose
  const schema = new mongoose.Schema({
    newsType: { type: String, required: true},
    title: { type: String, required: true},
    content: { type: String, required: true},
    isValid: { type: Boolean, default: true}
  })
  schema.set('timestamps', true)
  schema.set('collection', 'news')

  return mongoose.model('News', schema)
}