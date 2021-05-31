const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/multer-config')
const postCtrl = require('../controllers/post.controller')

router.post('/post', auth, postCtrl.createPost)
router.put('/post/:id', auth, postCtrl.modifyPost)
router.get('/post/:id', auth, postCtrl.getOnePost)
router.get('/users/:id', auth, postCtrl.getUserPosts)
router.get('/post', auth, postCtrl.getAllposts)
router.delete('/post/:id', auth, postCtrl.deletePost)
router.post('/post/pic', auth, upload.single('imageData'), postCtrl.createPicturePost)

module.exports = router