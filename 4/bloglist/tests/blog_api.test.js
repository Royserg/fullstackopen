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

/* GET */
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

  test('blogs have `id` property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

/* POST */
describe('POST api calls', () => {
  test('a blog post can be added', async () => {
    const blog = {
      title: 'Added blog post - test',
      author: 'Tester testerovsky',
      url: 'testUrl.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    // There is an extra blog in db
    expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)
    // Check if blog with title in db
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(blog.title)
  })
})

// Close mongoose connection after tests are done
afterAll(() => {
  mongoose.connection.close()
})
