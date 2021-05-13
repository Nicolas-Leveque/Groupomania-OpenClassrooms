module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        type_post: {
            type: Sequelize.STRING,
            allowNull: false
        },
        titre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contenu: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        image: {
            type: Sequelize.BLOB('long'),
            allowNull: true
        }
    })
    return Post
}
