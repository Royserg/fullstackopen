// Error handler middleware
const errorHandler = (error, req, res, next) => {
  const { name, kind, message } = error
  // console.error('err', error)
  // console.error('msg', error.message)

  if (name === 'CastError' && kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (name === 'ValidationError') {
    return res.status(400).json({ error: message })
  }

  next(error)
}

module.exports = errorHandler