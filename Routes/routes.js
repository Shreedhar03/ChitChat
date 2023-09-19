const express = require('express')
const { registerUser, loginUser, searchUser, accessChat } = require('../Controllers/userControllers')
const { authenticateUser } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/searchUser', authenticateUser, searchUser)
router.post('/accessChat', authenticateUser, accessChat)

module.exports = router