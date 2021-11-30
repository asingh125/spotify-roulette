const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Question = require('../models/question')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (err) {
    next(err)
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  try {
    const { questionText, answer, author } = req.body
    const question = await Question.create({ questionText, answer, author })
    res.send('question posted')
  } catch (err) {
    next(err)
  }
})

router.post('/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body
  try {
    const question = await Question.updateOne({ _id }, { answer })
    res.send('answer posted')
  } catch (err) {
    next(err)
  }
})

module.exports = router
