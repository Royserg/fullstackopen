const errorHandler = (error, req, res, next) => {
  const { name, message } = error

  if (name === 'ValidationError') {
    return res.status(400).json({ error: message })
  }
}

module.exports = errorHandler
