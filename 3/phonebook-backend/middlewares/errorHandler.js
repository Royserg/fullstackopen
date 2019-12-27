// Error handler middleware
const errorHandler = (error, request, response, next) => {
  const { name, kind } = error
  // console.error('err', error)
  // console.error('msg', error.message)

  if (name === 'CastError' && kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

module.exports = errorHandler