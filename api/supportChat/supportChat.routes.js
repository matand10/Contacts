const express = require('express')
const { query, create, addAdminMsg } = require('./supportChat.controller');
const { verifyToken, verifyTokenAndAdmin } = require('../../middlewares/requireAuth.middleware');
const router = express.Router()

router.get('/', verifyToken, query)
router.post('/create', verifyToken, create)
router.post('/admin-msg', verifyTokenAndAdmin, addAdminMsg)


module.exports = router