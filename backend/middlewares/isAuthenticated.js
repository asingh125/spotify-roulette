const isAuthenticated = async (req, res, next) => {
  if (req.session.username && req.session.password && (req.session.username !== '') && (req.session.password !== '')) {
    next()
  } else {
    next(new Error('user has not been authenticated'))
  }
}

module.exports = isAuthenticated
