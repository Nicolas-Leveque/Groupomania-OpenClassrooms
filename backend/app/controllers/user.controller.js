const express = require('express')
const db = require('../models')
const bcrypt = require('bcrypt')
const User = db.users
const Op = db.Sequelize.Op

const router = new express.Router()

exports.signup = async (req, res) => {
    try {
        await User.create(req.body)
        res.status(201).send({ message: "User created"})
    } catch (e) {
        res.status(400).send(e)
    }

}
exports.login = async ( req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            throw new Error('Erreur de connexion, veuillez réessayer')
        }
        const isMatch = await bcrypt.compare(req.body.password, user.dataValues.password)
        if (!isMatch) {
            throw new Error('Erreur de connexion, veuillez réessayer')
        }
        res.status(200).send(`${user.firstName} ${user.lastName}`)

    } catch(e) {
        res.status(400).send(e)
    }
}
