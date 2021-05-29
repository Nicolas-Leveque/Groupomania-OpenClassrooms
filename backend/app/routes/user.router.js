const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/multer-config')
const userCtrl = require('../controllers/user.controller');

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/user/me', auth, userCtrl.getUser)
router.delete('/:id',auth, userCtrl.deleteUser)
router.post('/user/avatar', auth, upload.single('imageData'), userCtrl.uploadAvatar)
router.put('/user/:id', auth, userCtrl.modifyUser)

module.exports = router