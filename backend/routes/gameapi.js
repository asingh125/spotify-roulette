const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const User = require('../models/user')
const Game = require('../models/game')
const request = require('request'); 

const router = express.Router()

router.post('/create', isAuthenticated, async (req, res, next) => {
  const { players } = req.body
  const mode = 1
  const round = 0
  const answer = ""
  const songs = []
  const songOrder = []
  const song = ""
  try {
    const thegame = await Game.create({ players, mode, round, answer, songs, songOrder, song })
    
    //get the playlist songs and save them in items
    const username = req.session.username
    const theuser = await User.findOne({ username })
    const playlistID = theuser.playlistID
    const access_token = theuser.token
    const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
    var options = {
      url: url,
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    let items = []
    request.get(options, async function(error, response, body) {
      items = body.items
      
      const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      }

      //get 2 random songs
      let s1 = getRandomInt(items.length)
      let s2 = getRandomInt(items.length)
      while (s2 === s1) {
        s2 = getRandomInt(items.length)
      }
      const song1 = items[s1].track
      const song2 = items[s2].track

      //save strings with song info
      const artists1 = song1.artists
      const string1 = `${username}|${song1.href}|${song1.name}|${artists1[0].name}`
      const artists2 = song2.artists
      const string2 = `${username}|${song2.href}|${song2.name}|${artists2[0].name}`

      let _id = thegame._id
      
      if (thegame.mode === 1) {
        //add the songs to the game entry
        const songs = thegame.songs 
        songs.push(string1)
        songs.push(string2)
        await Game.updateOne({ _id }, { songs })
        console.log(`http://localhost:3000/${_id.toString()}`)
        res.send(_id.toString())
      } else {
        res.send(_id.toString())
      }
      
    });
    
  } catch (err) {
    next(err)
  }
})

router.post('/join', isAuthenticated, async (req, res, next) => {
  try {
    const { _id, username } = req.body
    const thegame = await Game.findOne({ _id })
    if (!req.session.username) {
      res.send('not logged in')
    } else if (!thegame) {
      res.send('game does not exist')
    } else {
      const players = thegame.players
      players.push(username)
      const newgame = await Game.updateOne({ _id }, { players })
      res.send('game joined')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/players', isAuthenticated, async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    res.send(thegame.players.toString())
  } catch (err) {
    next(err)
  }
})

router.get('/scores', isAuthenticated, async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    const players = thegame.players
    let scoreArr = []
    for (let i = 0; i < players.length; ++i) {
      let player = players[i]
      const username = player
      let theuser = await User.findOne({ username })
      scoreArr.push(theuser.score)
    }
    res.send(scoreArr.toString())
  } catch (err) {
    next(err)
  }
})

router.post('/startgame', isAuthenticated, async (req, res, next) => {
  try {
    const idArray = req.headers.referer.split('/')
    const _id = idArray[idArray.length - 1]
    const mode = 2
    const round = 1
    const thegame = await Game.findOne({ _id })
    if (thegame.mode === 1) {
      //set all answers to empty strings to start
      const players = thegame.players
      for (let i = 0; i < players.length; ++i) {
        let player = players[i]
        const username = player
        const answer = ""
        const score = 0
        await User.updateOne({ username }, { answer, score })
      }

      //come up with a random order to play the songs in
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
      }
      const songOrder = []
      for (let i = 0; i < (2 * players.length); ++i) {
        songOrder.push(i)
      }
      shuffleArray(songOrder)

      const songs = thegame.songs
      const song = songs[songOrder[0]]
      const answer = song.split('|')[0]

      await Game.updateOne({ _id }, { songOrder, song, answer })

      //change the game mode
      const newgame = await Game.updateOne({ _id }, { mode, round })

      res.send('game started')
    } else {
      res.send('wrong mode')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/mode', isAuthenticated, async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    res.send(thegame.mode.toString())
  } catch (err) {
    next(err)
  }
})

router.get('/song', isAuthenticated, async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    res.send(thegame.song.toString())
  } catch (err) {
    next(err)
  }
})

router.get('/roundnum', isAuthenticated, async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    res.send(thegame.round.toString())
  } catch (err) {
    next(err)
  }
})

router.post('/submitanswer', isAuthenticated, async (req, res, next) => {
  try {
    let { answer } = req.body
    const username = req.session.username
    const idArray = req.headers.referer.split('/')
    const _id = idArray[idArray.length - 1]
    const thegame = await Game.findOne({ _id })
    const correctAnswer = thegame.answer
    if (thegame.mode === 2) {
      //update our user's answer and score
      const ouruser = await User.findOne({ username })
      const oldScore = ouruser.score
      let score = oldScore
      if (answer === correctAnswer) {
        score = score + 1
      }
      await User.updateOne({ username }, { answer, score })

      //check to see if everyone else has submitted answers
      const players = thegame.players
      let allOtherAnswers = true
      for (let i = 0; i < players.length; ++i) {
        let player = players[i]
        let username = player
        let otherPlayer = await User.findOne({ username })
        if (otherPlayer.answer.length === 0) {
          allOtherAnswers = false
        }
      }

      //if all other answers are in, change the mode to 3 (between rounds mode)
      if (allOtherAnswers) {
        const mode = 3
        await Game.updateOne({ _id }, { mode })
      }

      res.send('answer submitted')
    } else {
      res.send('wrong mode')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/nextround', isAuthenticated, async (req, res, next) => {
  try {
    const idArray = req.headers.referer.split('/')
    const _id = idArray[idArray.length - 1]
    const thegame = await Game.findOne({ _id })
    if (thegame.mode === 3) {
      //set all answers to empty strings to start
      const players = thegame.players
      for (let i = 0; i < players.length; ++i) {
        let player = players[i]
        const username = player
        const answer = ""
        await User.updateOne({ username }, { answer })
      }

      //if we have reached the end, set mode to end mode
      if (thegame.round >= (2 * players.length)) {
        let mode = 4
        await Game.updateOne({ _id }, { mode })
        res.send('game over')
      } else {
        //change the round number and mode
        let mode = 2
        let round = thegame.round + 1
        
        const songs = thegame.songs
        const song = songs[thegame.songOrder[round - 1]]
        const answer = song.split('|')[0]

        await Game.updateOne({ _id }, { song, answer })

        //change the game mode
        const newgame = await Game.updateOne({ _id }, { mode, round })

        res.send('round started')
      }
    } else {
      res.send('wrong mode')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/end', isAuthenticated, async (req, res) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    let mode = 4
    await Game.updateOne({ _id }, { mode })
    res.send('game over')
  } catch (err) {
    next(err)
  }
})

router.post('/isLoggedIn', async (req, res) => {
  if (req.session.username !== null && req.session.password !== null) {
    res.send(req.session.username)
  } else {
    res.send('')
  }
})

router.post('/add_token_to_user', isAuthenticated, async (req, res) => {
  const username = req.session.username
  const token = req.session.spotify_access_token
  const theuser = await User.updateOne({ username }, { token })
})

router.post('/get_playlist_songs', async (req, res) => {
  const username = req.session.username
  const theuser = await User.findOne({ username })
  const playlistID = theuser.playlistID
  const access_token = theuser.token
  const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
  var options = {
    url: url,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };
  let tracks = []
  request.get(options, function(error, response, body) {
    tracks = body.items
    res.json(body)
  });
})

router.post('/add_songs_to_game', isAuthenticated, async (req, res, next) => {
  try {
    //get the playlist songs and save them in items
    const username = req.session.username
    const theuser = await User.findOne({ username })
    const playlistID = theuser.playlistID
    const access_token = theuser.token
    const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
    var options = {
      url: url,
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    let items = []
    request.get(options, async function(error, response, body) {
      items = body.items
      
      const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      }

      //get 2 random songs
      let s1 = getRandomInt(items.length)
      let s2 = getRandomInt(items.length)
      while (s2 === s1) {
        s2 = getRandomInt(items.length)
      }
      const song1 = items[s1].track
      const song2 = items[s2].track

      //save strings with song info
      const artists1 = song1.artists
      const string1 = `${username}|${song1.href}|${song1.name}|${artists1[0].name}`
      const artists2 = song2.artists
      const string2 = `${username}|${song2.href}|${song2.name}|${artists2[0].name}`

      let { _id } = req.body
      const thegame = await Game.findOne({ _id })
      
      if (thegame.mode === 1) {
        //add the songs to the game entry
        const songs = thegame.songs 
        songs.push(string1)
        songs.push(string2)
        await Game.updateOne({ _id }, { songs })
        res.send('songs added')
      } else {
        res.send('wrong mode')
      }
      
    });

  } catch (err) {
    next(err)
  }
})

module.exports = router
