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
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
    return Post
}