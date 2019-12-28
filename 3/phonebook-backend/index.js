require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const errorHandler = require('./middlewares/errorHandler')
const unknownEndpoint = require('./middlewares/unknownEndpoint')

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
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person
    .findById(id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res
          .status(404)
          .json({ error: 'Person not found' })
      }

    })
    .catch(error => {
      next(error)
    })
})

// Delete person of given id
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person
    .findByIdAndDelete(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})


// Add person
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res
      .status(400)
      .json({ error: 'name or number missing' })
  }

  const person = new Person({ name, number })
  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body

  const person = { name, number }

  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})


// Fallback route, redirects to root
app.get('*', (req, res) => {
  res.redirect(301, '/')
})


// handler of requests with unknown endpoint, at the end but before errorHandler
app.use(unknownEndpoint)

// handler of requests with result to errors, needs to be at the end
app.use(errorHandler)


app.listen(PORT, () => console.log(`App running on port ${PORT}`))