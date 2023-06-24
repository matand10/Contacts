const express = require('express')
const { getCompanies, remove, update, create } = require('./company.controller');
const router = express.Router()

router.post('/', getCompanies)
router.post('/create', create)
router.post('/update/:id', update)
router.post('/:id', remove)

module.exports = router