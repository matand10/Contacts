const router = require("express").Router();
const contactTransactionService = require("../services/contactTransaction.service");
const { validateToken, verifyTokenAndAdmin } = require("../routes/verifyToken");

router.post("/users", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { contactIds } = req.body
        console.log('contactIds', contactIds)
        const users = await contactTransactionService.getUsersTransactionByContactId(contactIds)
        res.status(200).json({ status: 'ok', content: users })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

//CREATE
router.post("/create", validateToken, async (req, res) => {
    try {
        const transaction = req.body
        await contactTransactionService.add(transaction)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //UPDATE
router.post("/update/:id", async (req, res) => {
    try {
        const { transaction } = JSON.parse(req.body.data)
        await contactTransactionService.update(transaction)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //DELETE
router.post("/:id", async (req, res) => {
    try {
        const { id } = JSON.parse(req.body.data)
        await contactTransactionService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const filterBy = req.query
        const transactions = await contactTransactionService.get(filterBy)
        res.status(200).json({ status: 'ok', content: transactions })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

module.exports = router;