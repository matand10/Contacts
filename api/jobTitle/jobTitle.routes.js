const express = require('express')
const { query, remove, update, create } = require('./jobTitle.controller');
const router = express.Router()

router.post('/', query)
router.post('create', create)
router.post('/:id', remove)
router.post('/update/:id', update)

module.exports = router