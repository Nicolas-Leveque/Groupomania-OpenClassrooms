const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/comment.controller')

router.post('/comment', auth, commentCtrl.createComment)
router.put('/comment', auth, commentCtrl.modifyComment)
router.get('/comment', auth, commentCtrl.getAllComments)
router.get('comment/:id', auth, commentCtrl.getOneComment)
router.delete('comment/:id', auth, commentCtrl.deleteComment)

module.exports = router