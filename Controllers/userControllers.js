const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const userModel = require('../Models/userModel')
const { generateToken } = require('../config/generateToken')
require('colors')

const registerUser = asyncHandler(async (req, res) => {
    let { fname, lname, username, pass, pic } = req.body
    console.log(req.body)
    let user = await userModel.findOne({ username })
    if (user) {
        return res.json({ success: false, message: "Username already taken" })
    }

    let salt = await bcrypt.genSalt(12)
    let hashedPass = await bcrypt.hash(pass, salt)

    let newUser = await userModel.create({
        fname, lname, username, pass: hashedPass, pic
    })
    res.json({ success: true, message: "Account created", token: generateToken(newUser._id) })
})
const loginUser = asyncHandler(async (req, res) => {
    let { username, pass } = req.body
    console.log(req.body)
    let user = await userModel.findOne({ username })
    if (user) {
        let checkPass = await bcrypt.compare(pass, user.pass)
        if (checkPass)
            return res.json({ success: true, user })
    }

    res.json({ success: false, message: "Invalid credentials" })
})


module.exports = { registerUser, loginUser }