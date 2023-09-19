const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const userModel = require('../Models/userModel')
const chatModel = require('../Models/chatModel')
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
            return res.json({ success: true, token: generateToken(user._id) })
    }

    res.json({ success: false, message: "Invalid credentials" })
})
// /api/searchUser?keyword=surya
const searchUser = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword
        ? {
            $or: [
                { fname: { $regex: req.query.keyword, $options: "i" } },
                { lname: { $regex: req.query.keyword, $options: "i" } }
            ]
        }
        : {}

    const users = await userModel.find(keyword).find({ _id: { $ne: req.user._id } })
    res.json({ success: true, users })
})
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body

    let isChat = await chatModel.findOne({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-pass").populate("latestMessage")

    isChat = await userModel.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name pic fname lname"
    })

    if (isChat.length > 0) {
        res.json({ chat: isChat[0] })
    } else {

        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        let createdChat = await chatModel.create(chatData)
        let fullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
            "users", "-pass"
        )

        res.status(200).json({ fullChat })
    }
})
const fetchChat = asyncHandler(async (req, res) => {
})
const createGroupChat = asyncHandler(async (req, res) => {
})
const renameGroup = asyncHandler(async (req, res) => {
})
const addToGroup = asyncHandler(async (req, res) => {
})
const removeFromGroup = asyncHandler(async (req, res) => {
})
module.exports = { registerUser, loginUser, searchUser, accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup }