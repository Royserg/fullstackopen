const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  } catch (error) {
    throw new Error(error)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body)

    const result = await blog.save()
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await Blog.findByIdAndDelete(id)

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
