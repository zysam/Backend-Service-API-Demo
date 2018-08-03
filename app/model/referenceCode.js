module.exports = app => {
  const mongoose = app.mongoose
  const schema = new mongoose.Schema({
    code: { type: String, required: true, unique: true},
    userId: { type: String, required: true},
    count: { type: Number, default: 0},
    registeredUser: []
  })
  schema.set('timestamps', true)
  schema.set('collection', 'referenceCodes')

  return mongoose.model('ReferenceCode', schema)
}