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

  test('not defined "likes" property, default to 0', async () => {
    const blog = {
      title: 'Blog with missing likes',
      author: 'likes Misser',
      url: 'noLikes.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)

    expect(response.body.likes).toBeDefined()
  })

  test('missing `title` and `url` responds with 400', async () => {
    const blog = {
      author: 'noTitleBlogsvky',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  })
})

/* DELETE */
describe.only('deleting of a blog', () => {
  test('succeeds with code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with code 400 for invalid id', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.delete(`/api/blogs/${invalidId}`).expect(400)
  })
})

// Close mongoose connection after tests are done
afterAll(() => {
  mongoose.connection.close()
})
