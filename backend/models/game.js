const { Schema, model } = require('mongoose')

const gameSchema = new Schema({
  players: [{type: String}],
  round: { type: Number, required: true },
  mode: { type: Number, required: true },
  songs: [{type: String}],
  songOrder: [{type: Number}],
  answer: { type: String, default: ""},
  song: { type: String, default: ""}
})

module.exports = model('Game', gameSchema)
