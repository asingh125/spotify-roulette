const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  playlistID: { type: String, required: true }, 
  score: { type: Number, required: true }, 
  answer: { type: String, required: false }, 
  token: { type: String, default: '', required: true }
  // submittedAnswer: { type: Boolean, required: true }, 
  //songIds: [{type: String}]
})

module.exports = model('User', userSchema)
