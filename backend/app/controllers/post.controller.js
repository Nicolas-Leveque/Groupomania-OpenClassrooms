const express = require('express');
const fs = require('fs');
const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

const router = new express.Router();

exports.createPost = async (req, res) => {
	try {
		const newPost = {
			...req.body,
			userId: req.user.id,
		};

		if (req.file) {
			const imageUrl = `${req.protocol}://${req.get('host')}/images/${
				req.file.filename
			}`;
			newPost.imageUrl = imageUrl;
		}

		const posts = await Post.create(newPost);
		res.status(201).send({ message: 'Post created' });
	} catch (e) {
		res.status(400).send(e);
	}
};

exports.modifyPost = async (req, res) => {
	try {
		const postObject = req.file
			? {
					...req.body,
					imageUrl: `${req.protocol}://${req.get('host')}/images/${
						req.file.filename
					}`,
			  }
			: { ...req.body };

		if (postObject.imageUrl) {
			const oldPost = await Post.findOne({ where: { id: req.params.id } });
			const oldFile = oldPost.imageUrl.split('/images/')[1];
			fs.unlinkSync(`images/${oldFile}`);
		}
		const post = await Post.update(postObject, {
			where: { id: req.params.id },
		});
		if (!post) {
			res.status(404).send();
		}
		res.status(200).json({ message: 'Post modifié' });
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

exports.getOnePost = async (req, res) => {
	try {
		const id = req.params.id;
		const post = await Post.findOne({
			where: {
				id: id,
			},
			include: [
				{ model: User, as: 'user' },
				{ model: Comment, as: 'comments' },
			],
		});

		if (!post) {
			res.status(404).send();
		}
		res.status(200).send(post);
	} catch (e) {
		res.status(400).send(e);
	}
};

exports.getUserPosts = async (req, res) => {
	try {
		const posts = await Post.findAll({
			where: { userId: req.params.id },
			include: [
				{ model: User, as: 'user' },
				{ model: Comment, as: 'comments' },
			],
		});
		if (!posts) {
			res.status(404).send();
		}
		res.status(200).send(posts);
	} catch (e) {
		res.status(400).send(e);
	}
};

exports.getAllposts = async (req, res) => {
	try {
		const posts = await Post.findAll({
			include: [
				{ model: User, as: 'user' },
				{ model: Comment, as: 'comments' },
			],
			order: [['createdAt', 'DESC']],
		});
		res.status(200).send([...posts]);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

exports.deletePost = async (req, res) => {
	try {
		const id = req.params.id;
		const post = await Post.findOne({
			where: {
				id: id,
			},
		});
		const fileName = post.imageUrl.split('images/')[1];
		console.log(post.imageUrl);
		fs.unlinkSync(`./images/${fileName}`);
		await Post.destroy({
			where: { id: id },
		});
		res.status(200).send({ message: 'post deleted' });
	} catch (e) {
		res.status(400).send(e);
	}
};
