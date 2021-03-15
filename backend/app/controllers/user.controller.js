const express = require('express')
const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op

const router = new express.Router()

exports.signup = async (req,res ) => {
    try {
        await User.create(req.body)
        res.status(201).send({ message: "User created"})
    } catch (e) {
        res.status(400).send(e)
    }

}
