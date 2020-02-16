const mongoose = require('mongoose')

const { Schema, model } = mongoose
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  passwordHash: {
    type: String
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.methods.toJSON = function () {
  const author = this
  const userObj = author.toObject()

  userObj.id = userObj._id.toString()

  delete userObj.passwordHash
  delete userObj._id
  delete userObj.__v

  return userObj
}

const User = model('User', userSchema)

module.exports = User
