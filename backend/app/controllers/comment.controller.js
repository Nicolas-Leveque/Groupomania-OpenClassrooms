const express = require('express')
const db = require('../models')
const Comment = db.comments
const User = db.users
const Op = db.Sequelize.Op
const { QueryTypes } = require('sequelize')

const router = new express.Router()

exports.createComment = async (req, res) => {
    try {
        await Comment.create(req.body)
        res.status(201).send({ message: "Comment created successfully"})
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.modifyComment = async (req, res) => {
    try {
        const comment = await Comment.update( req.body, {
            where: { id: req.params.id}
        })
        if (!comment) {
            res.status(404).send()
        }
        res.status(200).send({ message: "Commentaire modifié "})

    } catch (e) {
        res.status(500).send(e)
    }
}

exports.getOneComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id)
        if (!comment) {
            res.status(404).send()
        }
        res.status(200).send(comment)

    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getPostComments = async (req, res) => {
    try {
        const id = req.params.id
        const comments = await Comment.sequelize.query(`SELECT comments.id, contenu, comments.createdAt, comments.postId, firstName, lastName, imagetype, imageData FROM comments JOIN users on comments.userId = users.id WHERE postId = ${id} ORDER by comments.createdAt ASC`, {type: QueryTypes.SELECT})
        .then(comment => {
            comment.map(comment => {
                const userImage = comment.imageData.toString('base64')
                comment['imageData'] = userImage
            })
            return comment
        })
        if (!comments) {
            res.status(404).send()
        }
        console.log('reponse', comments)
        res.status(200).send(comments)
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
}
exports.deleteComment = async (req, res) => {
    try {
        Comment.destroy({ 
            where: { id : req.params.id}
        })
        res.status(200).send({ message: "Comment deleted" })
    } catch(e) {
        res.status(400).send(e)
    }
}