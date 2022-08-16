/* eslint-disable */
const express = require('express')
const request = require('request')
const User = require('../models/user')
const Game = require('../models/game')

const router = express.Router()

var client_id = '57de1779f0c1405ab175a20514bc6c30';
var client_secret = 'bf16f90326c94a249002086a95c1fda7';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   form: {
//     grant_type: 'authorization_code'
//   },
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//   },
//   json: true
// }

router.post('/create', async (req, res, next) => {
  const mode = 1
  const round = 0
  const answer = ''
  const songs = []
  const songOrder = []
  const song = ''
  try {
    var token = ''
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        token = body.access_token
      }
      access_token = token
      
      //get the playlist songs and save them in items
      const { username, playlistID } = req.body
      // const username = req.session.username
      // const theuser = await User.findOne({ username })
      // const playlistID = theuser.playlistID
      // const access_token = theuser.token
      console.log(`the playlist ID is : ${playlistID}`)
      const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
      var options = {
        url: url,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
      let items = []
      request.get(options, async function(error, response, body) {
        // console.log(body)
        items = body.items
        // console.log(items)
        // console.log(error)
        // console.log(response)
        
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

        console.log(string1)
        console.log(string2)

        // Actually create the game now
        players = [username]
        Game.create({ players, mode, round, answer, songs, songOrder, song }).then(thegame => {        
          if (thegame.mode === 1) {
            //add the songs to the game entry
            const songs = thegame.songs 
            const _id = thegame._id
            songs.push(string1)
            songs.push(string2)
            Game.updateOne({ _id }, { songs }).then(result => {
              // console.log(`http://localhost:3000/game/${_id.toString()}`)
              req.session.username = username
              req.session.gameID = _id
              res.send(_id.toString())
            })
          } else {
            res.send(_id.toString())
          }
        })
      })
    })
    
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.post('/join', async (req, res, next) => {
  try {
    const { _id, username } = req.body
    const thegame = await Game.findOne({ _id })
    // if (!req.session.username) {
    //   res.send('not logged in')
    // } else 
    if (!thegame) {
      res.send('game does not exist')
    } else {
      const players = thegame.players
      players.push(username)
      await Game.updateOne({ _id }, { players })
      req.session.username = username
      req.session.gameID = _id
      res.send('game joined')
    }
  } catch (err) {
    console.log('WRONG PATH')
    next(err)
  }
})

router.get('/gameIDfromURL', async (req, res, next) => {
  try {
    const idArray = req.headers.referer.split('/')
    const _id = idArray[idArray.length - 1]
    console.log(req.headers)
    res.send(_id.toString())
  } catch (err) {
    next(err)
  }
})

// Returns the game _id, from the cookie
router.get('/gameID', async (req, res, next) => {
  try {
    let _id = req.session.gameID
    res.send(req.session.gameID.toString())
  } catch (err) {
    next(err)
  }
})

router.get('/answer', async (req, res, next) => {
  try {
    const idArray = req.headers.referer.split('/')
    const _id = idArray[idArray.length - 1]
    const thegame = await Game.findOne({ _id })
    res.send(thegame.answer.toString())
  } catch (err) {
    next(err)
  }
})

router.get('/players', async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    res.send(thegame.players.toString())
  } catch (err) {
    next(err)
  }
})

router.get('/scores', async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    res.send(thegame.scores.toString())
  } catch (err) {
    next(err)
  }
})

router.post('/startgame', async (req, res, next) => {
  try {
    const idArray = req.headers.referer.split('/')
    const _id = idArray[idArray.length - 1]
    const mode = 2
    const round = 1
    const thegame = await Game.findOne({ _id })
    if (thegame.mode === 1) {

      //initialize numPlayers, scores, and  guesses to correct length
      const players = thegame.players
      const numPlayers = players.length
      let guesses = []
      let scores = []
      for (let i = 0; i < numPlayers; ++i) {
        guesses.push('')
        scores.push(0)
      }
      await Game.updateOne({ _id }, { numPlayers, guesses, scores })

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

router.get('/mode', async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    res.send(thegame.mode.toString())
  } catch (err) {
    next(err)
  }
})

router.get('/song', async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    res.send(thegame.song.toString())
  } catch (err) {
    next(err)
  }
})

router.get('/songID', async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    const songString = thegame.song.toString()
    if (songString.length > 0) {
      // console.log(`the song string is ${songString}`)
      const songLink = songString.split('|')[1]
      // console.log(`the song link is ${songLink}`)
      const trackIDArr = songLink.split('/')
      const trackID = trackIDArr[trackIDArr.length - 1]
      // console.log(trackID)
      res.send(trackID)
    } else {
      res.send('no song set')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/roundnum', async (req, res, next) => {
  const idArray = req.headers.referer.split('/')
  const _id = idArray[idArray.length - 1]
  try {
    const thegame = await Game.findOne({ _id })
    res.send(thegame.round.toString())
  } catch (err) {
    next(err)
  }
})

// function to help find index of player in players list
// const indexOf = (name, list) => {
//   for (let i = 0; i < list.length; i++) {
//     if list.get(i) === name
//   }
// }

router.post('/submitanswer', async (req, res, next) => {
  try {
    let { answer } = req.body
    // console.log(`THE ANSWER IS: ${answer}`)
    const username = req.session.username
    // console.log(`The persons username is ${username}`)
    // console.log('hi whats up')
    // console.log(username)
    const idArray = req.headers.referer.split('/')
    const _id = idArray[idArray.length - 1]
    // console.log('REACHED HERE')
    let thegame = Game.findOne({ _id }).then( result => {
      let thegame = result
      const correctAnswer = thegame.answer
      // console.log('THE GAMES MODE IS: ')
      if (thegame.mode === 2) {
        // find our user's index in the list
        let userIndex = thegame.players.indexOf(username)
        // console.log(`The persons index is ${userIndex}`)
  
        // update their spot in guesses array
        let guesses = thegame.guesses
        if (guesses[userIndex] != '') {
          res.send('answer already submitted')
        } else {
          guesses[userIndex] = answer
          // await Game.updateOne({ _id }, { guesses })
    
          // update their spot in scores array
          let scores = thegame.scores
          let score = scores[userIndex]
          if (answer === correctAnswer) {
            scores[userIndex] = score + 1
          }
    
          // push the updates
          Game.updateOne({ _id }, { guesses, scores }).then( _ => {
            res.send('answer submitted')
            Game.findOne({ _id }).then( result => {
              let thegame = result
              let players = thegame.players
              let guesses = thegame.guesses
              let allOtherAnswers = true

              for (let i = 0; i < players.length; ++i) {
                let otherPlayerIndex = thegame.players.indexOf(players[i])
                if (guesses[otherPlayerIndex].length === 0) {
                  allOtherAnswers = false
                }
              }
        
              //if all other answers are in, change the mode to 3 (between rounds mode)
              if (allOtherAnswers) {
                const mode = 3
                Game.updateOne({ _id }, { mode }).then( result => {
                  console.log('mode has been changed')
                })
              }
            })
          })
        }
    
      } else {
        res.send('wrong mode')
      }
      })

  } catch (err) {
    next(err)
  }
})

router.post('/nextround', async (req, res, next) => {
  console.log('reached hehehehe')
  try {
    const idArray = req.headers.referer.split('/')
    const _id = idArray[idArray.length - 1]
    const thegame = await Game.findOne({ _id })
    console.log(`The round is ${thegame.round}`)
    if (thegame.mode === 3) {
      //set all answers to empty strings to start
      const players = thegame.players
      const guesses = thegame.guesses
      for (let i = 0; i < players.length; ++i) {
        guesses[i] = ''
      }
      await Game.updateOne({ _id }, { guesses })

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

router.post('/end', async (req, res) => {
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

router.post('/add_token_to_user', async (req, res) => {
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

router.post('/add_songs_to_game', async (req, res, next) => {
  try {
    var token = ''
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        token = body.access_token
      }
      access_token = token
      
      //get the playlist songs and save them in items
      const { username, playlistID, _id } = req.body
      console.log('username: ' + username)
      console.log('playlist: ' + playlistID)
      // const username = req.session.username
      // const theuser = await User.findOne({ username })
      // const playlistID = theuser.playlistID
      // const access_token = theuser.token
      const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
      var options = {
        url: url,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
      let items = []
      request.get(options, async function(error, response, body) {
        items = body.items
        // console.log(items)
        // console.log(error)
        // console.log(response)
        
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

        console.log(string1)
        console.log(string2)

        players = [username]
        const thegame = await Game.findOne({ _id })
        if (thegame.mode === 1) {
          //add the songs to the game entry
          const songs = thegame.songs 
          songs.push(string1)
          songs.push(string2)
          Game.updateOne({ _id }, { songs }).then(result => {
            res.send(_id.toString())
          })
        } else {
          res.send(_id.toString())
        }
      })
    })
    

  } catch (err) {
    next(err)
  }
})

module.exports = router
