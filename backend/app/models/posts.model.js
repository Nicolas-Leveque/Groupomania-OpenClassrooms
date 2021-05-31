module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        titre: {
            type: Sequelize.STRING
        },
        contenu: {
            type: Sequelize.TEXT
        },
        imageType: {
            type: Sequelize.STRING
        },
        imageName: {
            type: Sequelize.STRING
        },
        imageData: {
            type: Sequelize.BLOB('long'),
        }, 
    })
    return Post
}
