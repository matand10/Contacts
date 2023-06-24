const express = require('express')
const { verifyTokenAndAdmin, verifyToken, verifyAdmin } = require('../../middlewares/requireAuth.middleware')
const { removeUser, updateUser, getById, getUsers, createUser, getUserStats } = require('./user.controller')
const router = express.Router()


router.post('/', verifyTokenAndAdmin, getUsers)
router.post('/update', verifyToken, updateUser)
router.post('/create', verifyTokenAndAdmin, createUser)
router.post('/stats', verifyAdmin, getUserStats)
router.post('/remove/:id', verifyTokenAndAdmin, removeUser)
router.post('/find/:id', verifyToken, getById)

module.exports = router