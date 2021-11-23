const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  playlist: { type: String, required: true },
  premium: { type: Boolean, required: true },
})

module.exports = model('User', userSchema)
