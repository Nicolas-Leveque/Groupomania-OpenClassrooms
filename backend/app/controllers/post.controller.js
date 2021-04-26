const express = require('express')
const db = require('../models')
const Post = db.posts
const Op = db.sequelize.Op

const router = new express.Router()

exports.createPost = async (req, res) => {
    try {
    await Post.create(req.body)
    res.status(201).send({ message: "Post created"})
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.modifyPost = async (req, res) => {
    try {
        const post = await Post.update( req.body, {
            where: { id: req.params.id},
        })
        if (!post) {
            res.status(404).send()
        }
        res.status(200).json({ message: "Post modifié"})
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.getOnePost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findByPk(id)
        if(!post) {
            res.status(404).send()
        }
        res.status(200).send(post)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const post = await Post.findAll( {
            where: {userId : req.params.id}
        })
        if (!post) {
            res.status(404).send()
        }
        res.status(200).send(post)
    } catch(e) {
        res.status(400).send(e)
    }
}
exports.deletePost = async (req, res) => {
    try {
        const id = req.params.id
        Post.destroy({
            where: { id: id}
        })
        res.status(200).send({ message: "post deleted"})
    } catch(e) {
        res.status(400).send(e)        
    }
}