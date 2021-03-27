const jwt = require('jsonwebtoken')
// const User = require('../models/users.model')
const db = require('../models/index')
const User = db.users

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        console.log("avant request")
        const user = await User.findByPk(decoded.id)
        // const user = await db.sequelize.models.user.findOne({
        //     where: { id: decoded.id}
        // })
        console.log("test")
        if (!user) {
            throw new Error({error: 'Authentication error'})
        }
        next()

    }catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
}

module.exports = auth