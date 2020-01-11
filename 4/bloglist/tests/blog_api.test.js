/* eslint-env jest */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const { initialBlogs, blogsInDb } = require('./test_helper')

const api = supertest(app)

// Fill database before running tests
beforeEach(async () => {
  // clear database
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('GET api calls return', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
  })
})

// Close mongoose connection after tests are done
afterAll(() => {
  mongoose.connection.close()
})
