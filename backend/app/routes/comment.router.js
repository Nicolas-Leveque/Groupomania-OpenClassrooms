const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/comment.controller')

router.post('/comments', auth, commentCtrl.createComment)
router.put('/comments', auth, commentCtrl.modifyComment)
router.get('/comments', auth, commentCtrl.getAllComments)
router.get('comments/:id', auth, commentCtrl.getOneComment)
router.delete('comments/:id', auth, commentCtrl.deleteComment)

module.exports = router