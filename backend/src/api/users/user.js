const restful = require('node-restful')
const mongoose = restful.mongoose
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, min: 6, max: 12, required: true },
  leo: { type: String, required: false },
  age: { type: Number, required: false },
  photo: { type: String, required: false }
})
module.exports = restful.model('User', userSchema)