const mongoose = require('mongoose')

const { Schema, model } = mongoose

const blogSchema = Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.methods.toJSON = function () {
  const blog = this
  const blogObj = blog.toObject()

  blogObj.id = blogObj._id.toString()

  delete blogObj.__v
  delete blogObj._id

  return blogObj
}

const Blog = model('Blog', blogSchema)

module.exports = Blog
