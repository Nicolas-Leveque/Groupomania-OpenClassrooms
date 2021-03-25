module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        contenu: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Comment
}