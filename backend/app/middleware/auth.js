const jwt = require('jsonwebtoken')
const db = require('../models/index')
const User = db.users

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const user = await User.findByPk(decoded.id)

        if (!user) {
            throw new Error({error: 'Authentication error'})
        }
        next()

    }catch (e) {
        res.status(401).send(e)
    }
}

module.exports = auth