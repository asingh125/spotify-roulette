const mongoose = require('mongoose')
const express = require('express')
const session = require('cookie-session')
const UserRouter = require('./routes/account')
const PlaylistRouter = require('./routes/api')
const errorHandler = require('./middlewares/errorHandler')
const path = require('path')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://aarushi:cis197@cluster0.yeefg.mongodb.net/spotify-roulette?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 3600000,
}))

app.post('/', (req, res) => {
  if (req.session.username && req.session.password) {
    res.send(`welcome ${req.session.username}`)
  } else {
    res.send('please log in')
  }
})

app.use('/account', UserRouter)
app.use('/api/questions', PlaylistRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
})

app.get('/', (req, res) => {
  res.send('welcome')
})

app.use(errorHandler)
