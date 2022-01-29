const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRouter = require('./app/routes/user.router');
const postRouter = require('./app/routes/post.router');
const commentRouter = require('./app/routes/comment.router');
const cors = require('cors');

const app = express();

const corsOptions = {
	origin: '*',
	allowedHeaders: 'Content-Type, Authorization',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

module.exports = app;
