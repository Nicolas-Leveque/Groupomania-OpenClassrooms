const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/multer-config')
const userCtrl = require('../controllers/user.controller');

router.post('/signup', upload.single('image'), userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/me', auth, userCtrl.getUser)
router.delete('/delete',auth, userCtrl.deleteUser)
router.put('/modify', auth, userCtrl.modifyUser)

module.exports = router