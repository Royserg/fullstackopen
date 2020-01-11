const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { MONGODB_URI } = require('./utils/config')

// Create Express app
const app = express()

// Apply middlewares
app.use(cors())
app.use(express.json())

// Apply controllers
app.use('/api/blogs', blogsRouter)

// Connect to db
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = app