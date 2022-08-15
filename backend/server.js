const mongoose = require('mongoose')
const express = require('express')
const session = require('cookie-session')
// const UserRouter = require('./routes/account')
const GameRouter = require('./routes/gameapi')
const path = require('path')
const User = require('./models/user')

var request = require('request'); 
var querystring = require('querystring');


var client_id = '57de1779f0c1405ab175a20514bc6c30'; // client id
var client_secret = 'bf16f90326c94a249002086a95c1fda7'; // secret
var redirect_uri = 'http://localhost:3000/callback'; // redirect uri



const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://aarushi:cis197@cluster0.yeefg.mongodb.net/?retryWrites=true&w=majority'//'mongodb+srv://aarushis:SinghGuest22@spotifyroulette.a4mbl.mongodb.net/?retryWrites=true&w=majority' //'mongodb+srv://aarushi:cis197@cluster0.yeefg.mongodb.net/spotify-roulette?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 999000,
  cookie: { secure: false },
}))

app.post('/', (req, res) => {
  if (req.session.username && req.session.password) {
    res.send(`welcome ${req.session.username}`)
  } else {
    res.send('please log in')
  }
})

app.get('/login', function(req, res) {

  var state = 'abcdefghijmnbvcx'//generateRandomString(16);
  //res.cookie(stateKey, state);
  req.session.spotify_auth_state = state

  //your application requests authorization
  var scope = 'user-read-private user-read-email playlist-read-private streaming';
  var s = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  })
  console.log(s)
  res.redirect(s);
});

// app.use('/account', UserRouter)
app.use('/gameapi', GameRouter)

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null
  var state = req.query.state || null
  var storedState = req.session.spotify_auth_state

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, async function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        
        req.session.spotify_access_token = access_token
        req.session.spotify_refresh_token = refresh_token
        req.session.save()
        const token = access_token
        const username = req.session.username
        await User.updateOne({ username }, { token } )

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

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
