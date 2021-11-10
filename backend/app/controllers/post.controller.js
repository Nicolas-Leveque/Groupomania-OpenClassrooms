const express = require('express')
const db = require('../models')
const Post = db.posts
const User = db.users
const Comment = db.comments

const { QueryTypes } = require('sequelize')

const router = new express.Router()

exports.createPost = async (req, res) => {
    try {
    await Post.create({...req.body, userId: req.user.id})
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
        console.log(e)
        res.status(500).send(e)
    }
}

exports.getOnePost = async (req, res) => {
    try {
        const id = req.params.id
        // const post = await Post.sequelize.query(`SELECT posts.userId, posts.id, posts.titre, posts.contenu, posts.createdAt AS creation, posts.imageUrl, users.firstName, users.lastName, users.admin, users.imageUrl as userAvatar, COUNT(comments.postID) AS nbr_comments FROM posts JOIN users ON posts.userId = users.id LEFT JOIN comments ON posts.id = comments.postId WHERE posts.id = ${id}`, {type: QueryTypes.SELECT})
        const post = await Post.findOne({
            where:{
                id: id
            },
            include: {model: User, as: 'user'},
            include: { model: Comment, as: 'comments'}
        })
        
        if(!post) {
            res.status(404).send()
        }
        res.status(200).send(post)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.findAll( {
            where: {userId : req.params.id},
            include: {model: User, as: 'user'},
            include: { model: Comment, as: 'comments'}
        })
        if (!posts) {
            res.status(404).send()
        }
        res.status(200).send(posts)
    } catch(e) {
        res.status(400).send(e)
    }
}

exports.getAllposts = async (req, res) => {
    try {
        // const posts = await Post.sequelize.query('
        // SELECT posts.userId, posts.id, posts.titre, posts.contenu, DATE_FORMAT(posts.createdAt,
        // "le %e/%m/%Y à %H:%i") AS creation, posts.imageUrl, users.firstName, users.lastName,
        // users.admin, users.imageType, users.imageData, COUNT(postID) AS nbr_comments
        // FROM posts JOIN users ON posts.userId = users.id
        // LEFT JOIN comments ON posts.id = comments.postId GROUP BY posts.id
        // ORDER BY posts.createdAt DESC', {type: QueryTypes.SELECT})
        const posts = await Post.findAll({
            where: {
                userInd: req.user.id
            },
            include: {model: User, as: 'user'},
            include: { model: Comment, as: 'comments'}
        })
        res.status(200).send({ ...posts})
    } catch(e) {
        console.log(e)
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