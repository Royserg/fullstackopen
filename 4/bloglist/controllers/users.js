const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})

    res.json(users)
  } catch (error) {
    next(error)
  }
})

// Add new user
userRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body
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
