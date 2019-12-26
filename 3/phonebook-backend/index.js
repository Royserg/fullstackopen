require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
const PORT = process.env.PORT || 5000

// Enable cors
app.use(cors())
app.use(express.json())

// Serve static files
// When receiving `GET` request corresponding page will be checked
// in 'build' directory, if correct file found, express returns it
// index.html goes to `/` or `/index.html`
app.use(express.static('build'))

// morgan.token('data', (req, res) => {
//   return JSON.stringify(req.body)
// })

// app.use(morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//     tokens['data'](req, res)
//   ].join(' ')
// }))

// == API ==
// Get all persons
app.get('/api/persons', (req, res) => {

  Person
    .find({})
    .then(persons => {
      res.json(persons)
    })
})



// Get one person by id
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  Person
    .findById(id)
    .then(foundPerson => {
      res.json(foundPerson)
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: 'Person not found' })
    })
})

// Delete person of given id
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  Person
    .deleteOne({ _id: id })
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})


// Add person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res
      .status(400)
      .json({ error: 'name or number missing' })
  }

  // Allow duplications: enabled
  // if (Person.find({ name }).length > 0) {
  //   return res
  //     .status(400)
  //     .json({ error: 'name must be unique' })
  // }


  const person = new Person({ name, number })
  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
})


// Fallback route, redirects to root
app.get('*', (req, res) => {
  res.redirect(301, '/')
})


app.listen(PORT, () => console.log(`App running on port ${PORT}`))