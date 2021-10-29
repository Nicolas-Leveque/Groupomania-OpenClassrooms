module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        titre: {
            type: Sequelize.STRING
        },
        contenu: {
            type: Sequelize.TEXT
        },
        imageUrl: {
            type: Sequelize.STRING
        },
    })
    return Post
}
