/* eslint-disable */

const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const express = require('express')
const session = require('cookie-session')
// const UserRouter = require('./routes/account')
const GameRouter = require('./routes/gameapi')
const path = require('path')

var request = require('request'); 
var querystring = require('querystring');


const app = express()
const MONGO_URI = process.env.MONGODB_URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 1000 * 60 * 60,
  cookie: { secure: false },
}))

app.use('/gameapi', GameRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
})

app.get('/', (req, res) => {
  res.send('welcome')
})
