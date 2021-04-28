const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/comment.controller')

router.post('/comment', auth, commentCtrl.createComment)
router.put('/comment/:id', auth, commentCtrl.modifyComment)
router.get('/comment/post/:id', auth, commentCtrl.getPostComments)
router.get('/comment/:id', auth, commentCtrl.getOneComment)
router.delete('/comment/:id', auth, commentCtrl.deleteComment)

module.exports = router