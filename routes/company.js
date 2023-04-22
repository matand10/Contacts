const router = require("express").Router();
const companyService = require("../services/company.service")

//CREATE
router.post("/create", async (req, res) => {
    try {
        const { company } = req.body
        const savedCompany = await companyService.add(company)
        res.status(200).json({ status: 'ok', content: savedCompany });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //UPDATE
router.post("/update/:id", async (req, res) => {
    try {
        const { company } = req.body
        await companyService.update(company)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //DELETE
router.post("/:id", async (req, res) => {
    try {
        const { id } = req.body
        await companyService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL COMPANIES
router.get("/", async (req, res) => {
    try {
        const companies = await companyService.get()
        res.status(200).json({ status: 'ok', content: companies })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

module.exports = router;