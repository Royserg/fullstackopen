/* eslint-env jest */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Author = require('../models/author')
const { usersInDB } = require('./test_helper')

const api = supertest(app)

describe('When there is initially one user at db', () => {
  beforeEach(async () => {
    await Author.deleteMany({})
    const author = new Author({ name: 'Test Author' })
    await author.save()
  })

  test('creation succeeds with a fresh name', async () => {
    const usersAtStart = await usersInDB()

    const newAuthor = {
      name: 'New author name'
    }

    await api
      .post('/api/users')
      .send(newAuthor)
      .expect(201)
      .expect('Content-Type', /json/)

    const usersAtEnd = await usersInDB()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(a => a.name)
    expect(usernames).toContain(newAuthor.name)
  })

  test('creation of author with existing name fails with proper status code and message', async () => {
    const usersAtStart = usersInDB()

    const newAuthor = {
      name: 'Test Author'
    }

    const result = await api
      .post('/api/users')
      .send(newAuthor)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('`name` to be unique')

    const usersAtEnd = usersInDB()

    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

// Close mongoose connection after tests are done
afterAll(() => {
  mongoose.connection.close()
})
