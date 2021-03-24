const jwt = require('jsonwebtoken')
const User = require('../models/users.model')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const user = await User.findOne({
            where: {id: decoded.userId}
        })
        if (!user) {
            throw new Error({error: 'Authentication error'})
        }

    }catch (e) {
        res.status(401).send(e)
    }
}

module.exports = auth