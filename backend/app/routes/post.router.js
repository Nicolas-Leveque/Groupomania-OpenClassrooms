const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post.controller')

router.post('/posts', auth, postCtrl.createPost)
router.put('/posts', auth, postCtrl.modifyPost)
router.get('/posts/:id', auth, postCtrl.getOnePost)
router.get('/posts/:userId', auth, postCtrl.getAllPosts)
router.delete('/posts/:id', auth, postCtrl.deletePost)

module.exports = router