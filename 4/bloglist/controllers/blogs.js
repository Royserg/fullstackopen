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

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, author, url, likes } = req.body

    const blog = await Blog.findById(id)

    if (title) blog.title = title
    if (author) blog.author = author
    if (url) blog.url = url
    if (likes) blog.likes = likes

    await blog.save()
    res.status(200).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
