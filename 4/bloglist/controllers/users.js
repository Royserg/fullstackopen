const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      url: 1,
      author: 1,
      likes: 1
    })

    res.json(users)
  } catch (error) {
    next(error)
  }
})

// Add new user
userRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!password || password.length < 3) {
      return res
        .status(400)
        .json({ error: 'Password is missing or is too short' })
    }

    const saltRounts = 10
    const passwordHash = await bcrypt.hash(password, saltRounts)

    const user = new User({
      username,
      passwordHash
    })

    const result = await user.save()
    res.status(201).json(result)
  } catch (error) {
    // console.log(error)
    next(error)
  }
})

module.exports = userRouter
