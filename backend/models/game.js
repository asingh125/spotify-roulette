const { Schema, model } = require('mongoose')

const gameSchema = new Schema({
  numPlayers: { type: Number, default: 0 },
  players: [{ type: String }],
  guesses: [{ type: String }],
  scores: [{ type: Number }],
  round: { type: Number, required: true },
  mode: { type: Number, required: true },
  songs: [{ type: String }],
  songOrder: [{ type: Number }],
  answer: { type: String, default: '' },
  song: { type: String, default: '' },
  time: { type: Date, default: Date.now },
})

module.exports = model('Game', gameSchema)
