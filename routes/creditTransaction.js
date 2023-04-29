const router = require("express").Router();
const creditTransactionService = require("../services/CreditTransaction.service");
const { validateToken, verifyTokenAndAdmin } = require("../routes/verifyToken");

//CREATE
router.post("/create", validateToken, async (req, res) => {
    try {
        const transaction = req.body
        await creditTransactionService.add(transaction)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //UPDATE
router.post("/update/:id", async (req, res) => {
    try {
        const { transaction } = JSON.parse(req.body.data)
        await creditTransactionService.update(transaction)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //DELETE
router.post("/:id", async (req, res) => {
    try {
        const { id } = JSON.parse(req.body.data)
        await creditTransactionService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const filterBy = req.query
        const transactions = await creditTransactionService.query(filterBy)
        res.status(200).json({ status: 'ok', content: transactions })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

module.exports = router;