const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

// Define schema for Person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  }
})

// Apply unique validator plugin
personSchema.plugin(uniqueValidator)

personSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()

  userObj.id = userObj._id.toString()
  delete userObj._id
  delete userObj.__v

  return userObj
}

module.exports = mongoose.model('Person', personSchema)
