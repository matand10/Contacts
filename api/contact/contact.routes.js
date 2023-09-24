const express = require('express')
const { verifyTokenAndAdmin, validateToken } = require("../../middlewares/requireAuth.middleware");
const { getUserContacts, add, update, remove, getById, getContacts, getContactByCategories, addMany } = require('./contact.controller')
const router = express.Router()

router.post('/', getContacts)
router.post('/user', validateToken, getUserContacts)
router.post('/create', verifyTokenAndAdmin, add)
router.post('/create/company', verifyTokenAndAdmin, addMany)
router.post('/update/:id', verifyTokenAndAdmin, update)
router.post('/:id', verifyTokenAndAdmin, remove)
router.get('/:category', getContactByCategories)
router.get('/find/:id', getById)

module.exports = router