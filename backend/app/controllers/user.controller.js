const express = require('express')
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = db.users
const fs = require('fs')
const Op = db.Sequelize.Op

const router = new express.Router()

exports.signup = async (req, res) => {
    try {
        const userInformation = { ...req.body}
        if ( userInformation.email === 'admin@groupomania.fr' ) {
            userInformation.admin = true
        } else {
            userInformation.admin = false
        }

        const user = await User.create(userInformation)
        const token = jwt.sign({ id: user.dataValues.id.toString() }, process.env.JWT_TOKEN, { expiresIn: 604800 })
        res.status(201).send({ user, token })
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
        const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_TOKEN, { expiresIn: 604800 })
        res.status(200).send({ user, token })

    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        const userImage = await user.imageData.toString('base64')
        user.imageData = userImage
        if(!user) {
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

exports.modifyUser = async (req, res) => {
    try {
        const user = await User.update( req.body, {
            where: { id: req.params.id },
        })
        if (!user) {
            res.status(404).send()
        }
        res.status(200).json({message: "Utilisateur modifié"})

    }catch(e) {
        res.status(500).send(e)
    }
}

exports.uploadAvatar = async (req, res) => {
    try {
        await User.update({
            imageType: req.file.mimetype,
            imageName: req.file.originalname,
            imageData: req.file.buffer, 
            },{where: {
                id: req.user.id
            }
            })
        res.status(201).json({ message: "avatar en ligne" })
    } catch (e) {
        res.status(400).send(e)
    }
}