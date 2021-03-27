const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user.controller');

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/user/:id', auth, userCtrl.getUser)
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router