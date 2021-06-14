const dbConfig = require('../config/db.config')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql',
    operatorAliases: false,
    dialectOptions: { 
        ssl: {
            require: false
        }
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users.model')(sequelize, Sequelize)
db.posts = require('./posts.model')(sequelize, Sequelize)
db.comments = require('./comments.model')(sequelize, Sequelize)

db.users.hasMany(db.posts, { as: "posts" })
db.users.hasMany(db.comments, { as: "comments" })
db.posts.hasMany(db.comments, { as: "comments" })

db.posts.belongsTo(db.users, { 
    foreignKey: "userId" ,
    as: "user" 
})
db.comments.belongsTo(db.posts, {
    foreignKey: "postId",
    as: "post"
})
db.comments.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
})
module.exports = db