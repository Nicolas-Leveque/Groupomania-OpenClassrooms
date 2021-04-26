const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    })
    User.beforeSave(async (user, options) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
    })
    return User
}