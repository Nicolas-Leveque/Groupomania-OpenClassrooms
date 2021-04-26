const jwt = require('jsonwebtoken')
const sequelize = require('sequelize')

const User = require('../../models/users.model')
const Post = require('../../models/posts.model')
const Comment = require('../../models/comments.model')

const userOne = {
    id: 1,
    email: 'nicolas@test.com',
    firstName: 'Nicolas', 
    lastName: 'Leveque',
    password: 'mySecurePassword'
}

const userTwo = {
    id: 2,
    email: 'vanessa@test.com',
    firstName: 'Vanessa', 
    lastName: 'Jullian', 
    password: 'anotherSecurePassword'
}

const postOne = {
    id: 1,
    type_post: text,
    titre: 'Lorem Ipsum',
    contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt tortor augue, et elementum orci elementum eget. Nam tellus diam, blandit tempus nisi sodales, tristique mollis erat. Ut varius mi ut arcu malesuada, vitae fringilla nunc luctus. Curabitur non nisl malesuada, pellentesque est at, pulvinar mauris. Ut mollis mauris sed faucibus porta. Aliquam id metus arcu.',
    userId: 1,

}

const postTwo = {
    id: 2,
    type_post: link,
    titre: 'A link post',
    contenu: 'www.anewpost.com',
    userId: 2,
}

const commentOne = {
    contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum vulputate nunc et dignissim. Donec tristique sem ut finibus venenatis. Praesent molestie purus lorem, eget lobortis felis consequat a.',
    postId: 1,
    userId: 2
}

const commentTwo = {
    contenu: 'Lorem ipsum dolor sit amet, consectet',
    postId: 2,
    userId: 1
}

const setupDatabase = () => {
    await User.destroy({
        truncate: true
    })
    await Post.destroy({
        truncate: true
    })
    await Comment.destroy({
        truncate: true
    })
    await User.create(userOne)
    await User.create(userTwo)
    await Post.create(postOne)
    await Post.create(postTwo)
    await Comment.create(commentOne)
    await Comment.create(commentTwo)
}

module.exports = {
    userOne,
    userTwo,
    postOne,
    postTwo,
    commentOne,
    commentTwo,
    setupDatabase
}
