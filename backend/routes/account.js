const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const User = require('../models/user')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { username, password, playlist } = req.body
  try {
    const olduser = await User.findOne({ username })
    if (!olduser) {
      const score = 0
      const answer = ''
      const token = 'default'
      const urlArr = playlist.split('/')
      const playlistID = urlArr[urlArr.length - 1]
      const newuser = await User.create({ token, username, password, playlistID, score, answer })
      res.send('user signed up')
    } else {
      res.send('this user already exists')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const theuser = await User.findOne({ username })
    if (!theuser) {
      res.send('user doesnt exist')
    } else {
      const { password: passDB } = theuser
      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user logged in')
      } else {
        res.send('wrong password')
      }
    }
  } catch (err) {
    next(err)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user logged out')
})

router.post('/isLoggedIn', async (req, res) => {
  if (req.session.username !== null && req.session.password !== null) {
    res.send(req.session.username)
  } else {
    res.send('')
  }
})

router.get('/get_access_token', async (req, res) => {
  res.send(String(req.session.spotify_access_token))
})

module.exports = router
