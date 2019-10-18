const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 4
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 2
  }
]

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people\n${new Date()}`)
})
// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Get one person by id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const person = persons.find(person => person.id === id);

  if (!person) {
    return res.status(404).end()
  }

  res.json(person)
})

// Delete person of given id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})


// Add person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  if (persons.find(person => person.name === name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }


  const newPerson = {
    name,
    number,
    id: Math.floor(Math.random() * 450)
  }

  persons.push(newPerson)
  return res.json(newPerson)
})


app.listen(PORT, () => console.log(`App running on port ${PORT}`))