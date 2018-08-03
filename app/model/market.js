module.exports = app => {
  const mongoose = app.mongoose
  const schema = new mongoose.Schema({
    assetName: { type: String, required: true},
    price: { type: Number, required: true},
    lastTime: { type: String, default: Date.now}
  })
  schema.set('timestamps', true)
  schema.set('collection', 'markets')

  return mongoose.model('Market', schema)
}