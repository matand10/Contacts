const router = require("express").Router();
const territoryService = require("../services/territory.service")

//CREATE
router.post("/create", async (req, res) => {
    try {
        const { territory } = JSON.parse(req.body.data)
        const savedEntity = await territoryService.add(territory)
        res.status(200).json({ status: 'ok', content: savedEntity });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //UPDATE
router.post("/update/:id", async (req, res) => {
    try {
        const { entity } = JSON.parse(req.body.data)
        await territoryService.update(entity)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //DELETE
router.post("/:id", async (req, res) => {
    try {
        const { id } = JSON.parse(req.body.data)
        await territoryService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL JOB TITLES
router.get("/", async (req, res) => {
    try {
        const entities = await territoryService.get()
        res.status(200).json({ status: 'ok', content: entities })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

module.exports = router;