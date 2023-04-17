const router = require("express").Router();
const creditService = require("../services/credit.service")

//CREATE
router.post("/create", async (req, res) => {
    try {
        const { credit } = JSON.parse(req.body.data)
        const savedCredit = await creditService.add(credit)
        res.status(200).json({ status: 'ok', content: savedCredit });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //UPDATE
router.post("/update/:id", async (req, res) => {
    try {
        const { credit } = JSON.parse(req.body.data)
        await creditService.update(credit)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //DELETE
router.post("/:id", async (req, res) => {
    try {
        const { id } = JSON.parse(req.body.data)
        await creditService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", async (req, res) => {
    try {
        const credits = await creditService.get()
        res.status(200).json({ status: 'ok', content: credits })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

module.exports = router;