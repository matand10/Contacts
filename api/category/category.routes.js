const express = require('express')
const { create, update, remove, getCategoriesManager, getCategories } = require('./category.controller');
const router = express.Router()

router.get('/', getCategories)
router.post('/create', create)
router.post('/update/:id', update)
router.post('/:id', remove)
router.get('/all-categories', getCategoriesManager)

module.exports = router