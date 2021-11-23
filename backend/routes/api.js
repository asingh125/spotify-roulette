const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Question = require('../models/question')

const router = express.Router()

router.get('/song', async (req, res, next) => {
  try {
    const playlist = await Question.find()
    res.json(playlist)
    //choose random song from playlist
  } catch (err) {
    next(err)
  }
})

router.post('/update', isAuthenticated, async (req, res, next) => {
  const { _id, newlink } = req.body
  try {
    const question = await Question.updateOne({ _id }, { newlink })
    res.send('playlist updated')
  } catch (err) {
    next(err)
  }
})

module.exports = router
