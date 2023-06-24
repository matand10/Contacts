const categoryService = require("./category.service")
const jobTitleService = require("../jobTitle/jobTitle.service")
const companyService = require("../company/company.service")
const territoryService = require("../territory/territory.service")

//CREATE
async function create(req, res) {
    try {
        const { category } = req.body
        const savedCategory = await categoryService.add(category)
        res.status(200).json({ status: 'ok', content: savedCategory });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const { category } = req.body
        await categoryService.update(category)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE
async function remove(req, res) {
    try {
        const { id } = req.body
        await categoryService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL CATEGORIES
async function getCategories(req, res) {
    try {
        const categories = await categoryService.get()
        res.status(200).json({ status: 'ok', content: categories })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

async function getCategoriesManager(req, res) {
    try {
        const categories = await categoryService.get()
        const jobTitles = await jobTitleService.get()
        const companies = await companyService.get()
        const territories = await territoryService.get()
        const content = { categories, jobTitles, companies, territories }

        res.status(200).json({ status: 'ok', content })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    getCategories,
    getCategoriesManager,
    create,
    update,
    remove,
}