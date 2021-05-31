const express = require('express')
const db = require('../models')
const Post = db.posts
const User = db.users
const { QueryTypes } = require('sequelize')

const router = new express.Router()

exports.createPost = async (req, res) => {
    try {
    await Post.create(req.body)
    res.status(201).send({ message: "Post created"})
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.createPicturePost = async (req, res) => {
    try {
        console.log(req.file)
        await Post.create({
            titre: req.body.titre,
            userId: req.body.userId,
            imageType: req.file.mimetype,
            imageName: req.file.originalname,
            imageData: req.file.buffer,
        })
        res.status(201).json({ message: "Post created" })
    } catch (e) {
        console.log(e)
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
        const post = await Post.sequelize.query(`SELECT posts.id, titre, posts.contenu, DATE_FORMAT(posts.createdAt, "le %e/%m/%Y à %H:%i") AS creation, posts.imageType AS postImgType , posts.imageData as postImgData, firstName, lastName, users.imageType, users.imageData, COUNT(postID) AS nbr_comments FROM posts JOIN users ON posts.userId = users.id LEFT JOIN comments ON posts.id = comments.postId WHERE posts.id = ${id}`, {type: QueryTypes.SELECT})
        .then(post => {
            post.map(post => {
                const userImage = post.imageData.toString('base64')
                post['imageData'] = userImage
                if(post.postImgData ) {
                    const postImage = post.postImgData.toString('base64')
                    post['postImgData'] = postImage
                } else {
                    return
                }
            })
            return post
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

exports.getAllposts = async (req, res) => {
    try {
        const posts = await Post.sequelize.query('SELECT posts.id, titre, posts.contenu, DATE_FORMAT(posts.createdAt, "le %e/%m/%Y à %H:%i") AS creation, posts.imageType AS postImgType, posts.imageData AS postImgData, firstName, lastName, users.imageType, users.imageData, COUNT(postID) AS nbr_comments FROM posts JOIN users ON posts.userId = users.id LEFT JOIN comments ON posts.id = comments.postId GROUP BY posts.id ORDER BY creation DESC', {type: QueryTypes.SELECT})
        .then(posts => {
            
            posts.map(post => {
                const userImage = post.imageData.toString('base64')
                post['imageData'] = userImage  
                if(post.postImgData ) {
                    const postImage = post.postImgData.toString('base64')
                    post['postImgData'] = postImage
                } else {
                    return
                }
            })
            return posts
        })
        res.status(200).send(posts)
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