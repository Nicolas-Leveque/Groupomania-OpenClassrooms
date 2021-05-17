const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        fullName: {
            type: Sequelize.VIRTUAL,
            get(){
                return `${this.firstName} ${this.lastName}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            }
        }
    })
    User.beforeSave(async (user, options) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
    })

    return User
}