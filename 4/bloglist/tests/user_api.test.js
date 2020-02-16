/* eslint-env jest */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { usersInDB } = require('./test_helper')

const api = supertest(app)

describe('When there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'testUser', password: 'test123' })
    await user.save()
  })

  /* Creation of a new user  */
  test('creation succeeds with a fresh name', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'New user name',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/)

    const usersAtEnd = await usersInDB()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(a => a.name)
    expect(usernames).toContain(newUser.name)
  })

  /* Fails - username already exists  */
  test('creation of user with existing name fails with proper status code and message', async () => {
    const usersAtStart = usersInDB()

    const newUser = {
      username: 'testUser',
      password: 'pas21'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = usersInDB()

    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  /* Password not provided */
  test('fails when password is not provided', async () => {
    const usersAtStart = usersInDB()

    const noPasswordUser = {
      username: 'I have no password'
    }

    const result = await api
      .post('/api/users')
      .send(noPasswordUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('Password is missing')

    const usersAtEnd = usersInDB()

    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  /* Too short Password */
  test('fails when password is shorter than 3 chars', async () => {
    const usersAtStart = usersInDB()

    const shortPasswordUser = {
      username: 'I have no password',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(shortPasswordUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('too short')

    const usersAtEnd = usersInDB()

    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  /* Too short username */
  test('fails if username is shorter than 3 chars', async () => {
    const usersAtStart = usersInDB()

    const shortUsernameUser = {
      username: 'my',
      password: 'correct_password'
    }

    const result = await api
      .post('/api/users')
      .send(shortUsernameUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('is shorter than the minimum')

    const usersAtEnd = usersInDB()

    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

// Close mongoose connection after tests are done
afterAll(() => {
  mongoose.connection.close()
})
