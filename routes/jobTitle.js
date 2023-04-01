const router = require("express").Router();
const jobTitleService = require("../services/jobTitle.service")

//CREATE
router.post("/create", async (req, res) => {
    try {
        const { jobTitle } = JSON.parse(req.body.data)
        const savedJobTitle = await jobTitleService.add(jobTitle)
        res.status(200).json({ status: 'ok', content: savedJobTitle });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //UPDATE
router.post("/update/:id", async (req, res) => {
    try {
        const { jobTitle } = JSON.parse(req.body.data)
        await jobTitleService.update(jobTitle)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //DELETE
router.post("/:id", async (req, res) => {
    try {
        const { id } = JSON.parse(req.body.data)
        await jobTitleService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL JOB TITLES
router.get("/", async (req, res) => {
    try {
        const jobTitles = await jobTitleService.get()
        res.status(200).json({ status: 'ok', content: jobTitles })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

module.exports = router;