const express = require('express')
const { register, login, logout, isAdmin } = require('./auth.controller')
const { verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

router.post('/register', register)
router.post('/isAdmin', verifyTokenAndAdmin, isAdmin)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router