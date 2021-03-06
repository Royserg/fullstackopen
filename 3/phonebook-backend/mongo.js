const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('provide password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-eqdjg.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// Define schema for Person
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // display list of numbers from db
  console.log('phonebook:')
  Person
    .find({})
    .then(persons => {
      persons.forEach(({ name, number }) => {
        console.log(`${name} ${number}`)
      })
      closeConnection()
    })

}

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number
  })

  person
    .save()
    .then(({ name, number }) => {
      console.log(`added ${name} number ${number} to phonebook`)
      closeConnection()
    })

}




function closeConnection () {
  mongoose.connection.close()
}
