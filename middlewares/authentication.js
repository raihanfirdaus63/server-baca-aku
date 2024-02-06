const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) =>{
    try {
        const { access_token } = req.headers
        if(!access_token) throw { name: 'Invalid Credential'}

        const decoded = decodeToken(access_token)

        const user = await User.findByPk(decoded.id)

        if (!user) throw { name: 'Invalid Credential' }

        req.user = user

        next()
        
    } catch (err) {
        next(err)
    }
}

module.exports = authentication