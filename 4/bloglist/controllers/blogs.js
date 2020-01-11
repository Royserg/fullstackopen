const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  } catch (e) {
    throw new Error(e)
  }
})

blogsRouter.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body)

    const result = await blog.save()
    res.status(201).json(result)
  } catch (e) {
    throw new Error(e)
  }
})

module.exports = blogsRouter
