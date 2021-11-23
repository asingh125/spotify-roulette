const errorHandler = async (err, req, res, next) => {
  res.status(200).send('error')
}

module.exports = errorHandler
