const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const userModel = require('../Models/userModel')
const chatModel = require('../Models/chatModel')
const { generateToken } = require('../config/generateToken')
const messageModel = require('../Models/messageModel')
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
            return res.json({ success: true, user, token: generateToken(user._id) })
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

    console.log("searchUsers")

    // const users = await userModel.find(keyword).find({ _id: { $ne: req.user._id } }) // get only searched user

    const users = await userModel.find({ _id: { $ne: req.user._id } }) // get all users and search on client side
    const currentUser = await userModel.find({ _id: { $eq: req.user._id } }) // get all users and search on client side
    res.json({ success: req.success, users, currentUser })
})
// get the chats related to the user or create a new chat
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body

    var isChat = chatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-pass").populate("latestMessage")

    isChat = await userModel.populate(isChat, {
        path: 'latestMessage.sender',
        select: "fname lname pic email"
    })

    if (isChat.length > 0) {
        return res.send(isChat[0])
    }

    var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId]
    }

    try {
        const createdChat = await chatModel.create(chatData)

        const fullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
            "users",
            "-pass"
        )

        res.status(201).send(fullChat)

    } catch (error) {
        res.send(error.message)
    }

})
// get the full chats for the logged in user
const fetchChats = asyncHandler(async (req, res) => {
    try {
        chatModel.find({
            users: { $elemMatch: { $eq: req.user._id } }
        }).populate("users", "-pass")
            .populate("groupAdmin", "-pass")
            .populate("latestMessage")
            .sort({ updatedAt: -1 }).then(async results => {
                results = await userModel.populate(results, {
                    path: "latestMessage.sender",
                    select: "fname lname pic"
                })

                res.send(results)
            })
    } catch (err) {
        res.send(err.message)
    }
})
const createGroupChat = asyncHandler(async (req, res) => {
    let users = JSON.parse(req.body.users)
    if (users.length < 2) {
        return res.send("More than 2 users required")
    }

    users.push(req.user)

    try {
        const groupChat = await chatModel.create({
            chatName: req.body.chatName,
            users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const fullGroupChat = await chatModel.findOne({
            _id: groupChat._id
        }).populate("users", "-pass")
            .populate("groupAdmin", "-pass")

        res.json({ fullGroupChat })
    } catch (error) {

    }
})
// send messages
const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body

    let newMessage = {
        sender: req.user._id,
        content,
        chat: chatId
    }

    try {
        var message = await messageModel.create(newMessage)
        message = await message.populate("sender", "fname lname")
        message = await message.populate("chat")
        message = await userModel.populate(message, {
            path:"chat.users",
            select:"fname lname pic"
        })

        await chatModel.findByIdAndUpdate(req.body.chatId,{
            latestMessage: message
        })

        res.json(message)

    } catch (err) {

    }
})
const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await messageModel.find({chat:req.params.chatId}).populate("sender","fname lname pic").populate("chat")
        const currentUser = await userModel.find({ _id: { $eq: req.user._id } }) // get all users and search on client side
        res.json({messages,currentUser})
    } catch (err) {
        res.send(err.message)
    }
})
const renameGroup = asyncHandler(async (req, res) => {
})
const addToGroup = asyncHandler(async (req, res) => {
})
const removeFromGroup = asyncHandler(async (req, res) => {
})
module.exports = { registerUser, loginUser, searchUser, accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup, sendMessage,allMessages }