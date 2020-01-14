const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const errorHandler = require('./middlewares/errorHandler')
const { MONGODB_URI } = require('./utils/config')

// Create Express app
const app = express()

// Apply middlewares
app.use(cors())
app.use(express.json())

// Apply controllers
app.use('/api/blogs', blogsRouter)

// Apply error handler middleware
app.use(errorHandler)

// Connect to db
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.set('useFindAndModify', false)

module.exports = app
