const express = require('express')
const db = require('../models')
const Comment = db.comments
const Op = db.Sequelize.Op

const router = new express.Router()

exports.createComment = async (req, res) => {
    try {
        await Comment.create(req.body)
        res.status(201).send({ message: "Comment created successfully"})
    } catch (e) {
        console.log(e)
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
        const id = req.params.id
        const comment = await Comment.findByPk(id)
        if (!comment) {
            res.status(404).send()
        }
        res.status(200).send(comment)

    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getAllComments = async (req, res) => {
    try {
        const comment = await Comment.findAll({
            where: {postId: req.params.id}
        })
        if (!comment) {
            res.status(404).send()
        }
        res.status(200).send(comment)
    } catch(e) {
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