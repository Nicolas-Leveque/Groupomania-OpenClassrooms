const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./app/routes/user.router')
const postRouter = require('./app/routes/post.router')
const commentRouter = require('./app/routes/comment.router')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true}))

const db = require('./app/models')
db.sequelize.sync()

app.use(cors())

app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)

module.exports = app