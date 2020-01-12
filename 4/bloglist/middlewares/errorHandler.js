const errorHandler = (error, req, res, next) => {
  const { name, message, kind } = error

  if (name === 'ValidationError') {
    return res.status(400).json({ error: message })
  } else if (name === 'CastError' && kind === 'ObjectId') {
    return res.status(400).json({ error: 'malformatted id' })
  }
}

module.exports = errorHandler
