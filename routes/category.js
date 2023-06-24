// const router = require("express").Router();
// const categoryService = require("../services/category.service")
// const jobTitleService = require("../services/jobTitle.service")
// const companyService = require("../services/company.service")
// const territoryService = require("../services/territory.service")

// //CREATE
// router.post("/create", async (req, res) => {
//     try {
//         const { category } = req.body
//         const savedCategory = await categoryService.add(category)
//         res.status(200).json({ status: 'ok', content: savedCategory });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // //UPDATE
// router.post("/update/:id", async (req, res) => {
//     try {
//         const { category } = req.body
//         await categoryService.update(category)
//         res.status(200).json({ status: 'ok' });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // //DELETE
// router.post("/:id", async (req, res) => {
//     try {
//         const { id } = req.body
//         await categoryService.remove(id)
//         res.status(200).json({ status: 'ok' });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// //GET ALL CATEGORIES
// router.get("/", async (req, res) => {
//     try {
//         const categories = await categoryService.get()
//         res.status(200).json({ status: 'ok', content: categories })
//     } catch (err) {
//         res.status(500).json(err);
//         throw err
//     }
// });

// router.get("/all-categories", async (req, res) => {
//     try {
//         const categories = await categoryService.get()
//         const jobTitles = await jobTitleService.get()
//         const companies = await companyService.get()
//         const territories = await territoryService.get()

//         res.status(200).json({ status: 'ok', content: { categories, jobTitles, companies, territories } })
//     } catch (err) {
//         res.status(500).json(err);
//         throw err
//     }
// })

// module.exports = router;