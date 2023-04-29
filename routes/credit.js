const router = require("express").Router();
const creditService = require("../services/credit.service")

//CREATE
router.post("/create", async (req, res) => {
    try {
        const credit = req.body
        const savedCredit = await creditService.add(credit)
        res.status(200).json({ status: 'ok', content: savedCredit });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //UPDATE
router.post("/update/:id", async (req, res) => {
    try {
        const credit = req.body
        await creditService.update(credit)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //DELETE
router.post("/:id", async (req, res) => {
    try {
        const { id } = req.body
        await creditService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.post("/", async (req, res) => {
    try {
        const credits = await creditService.query()
        res.status(200).json({ status: 'ok', content: credits })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

module.exports = router;