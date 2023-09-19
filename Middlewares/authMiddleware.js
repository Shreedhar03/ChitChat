const jwt = require('jsonwebtoken')
const userModel = require('../Models/userModel')
const asyncHandler = require('express-async-handler')

const authenticateUser = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.SECRET)
            req.user = await userModel.findById(decoded.id)

            next()
        } catch (err) {
            return res.json({err:err.message})
            console.log(err)
        }
    } else {
        return res.status(401).json({message:"Not authorized"})
    }
})

module.exports = { authenticateUser }