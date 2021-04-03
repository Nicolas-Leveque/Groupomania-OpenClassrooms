const express = require('express')
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
        const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_TOKEN)
        res.status(200).send({ user, token })

    } catch(e) {
        res.status(400).send(e)
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        if (!user) {
            res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e) {
        res.status(400).send(e)
    }
}

exports.deleteUser = async ( req, res) => {
    try {
        const id = req.params.id
        User.destroy({ where: { id: id}})
        res.status(200).json({message: "Utilisateur supprimé"})
    }catch(e) {
        res.status(400).send(e)
    }
}

// exports.modifyUser = async (req, res) => {
//     try {
        
//     }catch(e) {
//         res.status(400).send(e)
//     }
// }