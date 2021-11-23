const SpotifyStrategy = require('passport-spotify').Strategy;

const isAuthenticated = async (req, res, next) => {
  //SPOTIFY PASSPORT 
  passport.use(
    new SpotifyStrategy(
      {
        clientID: req.client_id,
        clientSecret: req.client_secret,
        callbackURL: 'http://localhost:3000/auth/spotify/callback'
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
        User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
          return done(err, user);
        })
      }
    )
  )
  
  if (passport.authenticate()) {
    next()
  } else {
    next(new Error('user has not been authenticated'))
  }
}

module.exports = isAuthenticated
