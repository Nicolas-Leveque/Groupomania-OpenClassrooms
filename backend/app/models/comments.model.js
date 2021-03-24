module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        contenu: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // PostId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        // UserId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // }
    })
    return Comment
}