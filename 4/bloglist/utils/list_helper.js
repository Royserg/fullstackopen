const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0 ? 0 : array.reduce(reducer, 0)
}

const favoriteBlog = array => {
  const reducer = (mostLiked, blog) => {
    return mostLiked.likes > blog.likes ? mostLiked : blog
  }

  return array.reduce(reducer, {})
}

const mostBlogs = array => {
  const reducer = (highest, blog) => {
    return resultObj[highest] > resultObj[blog] ? highest : blog
  }

  const resultObj = _.countBy(array, blog => blog.author)
  const author = Object.keys(resultObj).reduce(reducer)

  return { author, blogs: resultObj[author] }
}

const mostLikes = array => {
  const likesCount = {}

  array.forEach(blog => {
    const { author, likes } = blog
    likesCount[author]
      ? (likesCount[author] += likes)
      : (likesCount[author] = likes)
  })

  const highestLikesAuthor = Object.keys(likesCount).reduce((a, b) =>
    likesCount[a] > likesCount[b] ? a : b
  )

  return { author: highestLikesAuthor, likes: likesCount[highestLikesAuthor] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
