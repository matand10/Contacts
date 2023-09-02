const express = require('express')
const { getCountry, create, update, remove } = require('./country.controller');
const router = express.Router()

router.post('/', getCountry)
router.post('/create', create)
router.post('/update/:id', update)
router.post('/:id', remove)

module.exports = router