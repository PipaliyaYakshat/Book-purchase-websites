const jwt = require('jsonwebtoken')
const UM = require('../models/user')
require('dotenv').config()
exports.Auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization

        if (!token) throw new Error("Attach Token")

        const tokenVerify = jwt.verify(token, process.env.Secure_key)

        if (!tokenVerify) throw new Error("Invalid Token")

        const userVerify = await UM.findById(tokenVerify.id)
        if (!userVerify) throw new Error("Invalid User")

        next()

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }

}