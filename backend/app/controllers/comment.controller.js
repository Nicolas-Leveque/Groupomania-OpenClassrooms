const express = require('express')
const db = require('../models')
const Comment = db.comments
const Post = db.posts
const User = db.users
const Op = db.Sequelize.Op
const { QueryTypes } = require('sequelize')

const router = new express.Router()

exports.createComment = async (req, res) => {
    try {
        const newComment = { ...req.body, userId: req.user.id}
        await Comment.create(newComment)
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
        const comments = await Comment.findAll({
            where: {
                postId: id
            },
            include: {model: User, as: 'user'}
        })
        if (!comments) {
            res.status(404).send()
        }
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