const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1 })

    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const { title, url, likes, author } = req.body

    const user = await User.findById('5e45dbd50d7aaa3664a518f5')

    const blog = new Blog({ title, url, likes, author, user: user._id })

    // Add new blog
    const result = await blog.save()

    // Update user blogs list
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

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
