const { requireAdmin } = require("../middlewares/requireAuth.middleware");
const router = require("express").Router();
const categoryService = require("../services/category.service")

//CREATE
router.post("/create", async (req, res) => {
    try {
        const { category } = JSON.parse(req.body.data)
        await categoryService.update(category)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //UPDATE
router.post("/update/:id", async (req, res) => {
    try {
        const { category } = JSON.parse(req.body.data)
        await categoryService.update(category)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //DELETE
router.post("/:id", async (req, res) => {
    try {
        const { catId, option } = JSON.parse(req.body.data)
        await categoryService.removeCategory(catId, option)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL CATEGORIES
router.get("/", async (req, res) => {
    try {
        const categories = await categoryService.get()
        res.status(200).json({ status: 'ok', content: categories })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

module.exports = router;