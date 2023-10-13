const express = require('express')
const { registerUser, loginUser, searchUser, accessChat, fetchChats, createGroupChat, sendMessage, allMessages } = require('../Controllers/userControllers')
const { authenticateUser } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/searchUser', authenticateUser, searchUser)
router.post('/accessChat', authenticateUser, accessChat)
router.get('/fetchChats', authenticateUser, fetchChats)
router.post('/createGroupChat', authenticateUser, createGroupChat)
router.post('/sendMessage',authenticateUser,sendMessage)
router.get('/allMessages/:chatId',authenticateUser,allMessages)

module.exports = router