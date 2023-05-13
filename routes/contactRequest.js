const router = require("express").Router();
const contactRequestService = require("../services/contactRequest")
const contactService = require("../services/contact.service")
const { validateToken } = require("../routes/verifyToken");

//CREATE
router.post("/create", validateToken, async (req, res) => {
    try {
        const { contactRequest } = req.body
        await contactRequestService.add(contactRequest)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// //DELETE
router.post("/remove/:id", validateToken, async (req, res) => {
    try {
        const { id } = req.body
        await contactRequestService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.post("/update", validateToken, async (req, res) => {
    try {
        const contactRequest = req.body
        const savedContactRequest = await contactRequestService.approveContact(contactRequest)
        res.status(200).json({ status: 'ok', content: savedContactRequest })
    } catch (err) {
        res.status(500).json(err);
    }
});

// Reject
router.post("/reject", validateToken, async (req, res) => {
    try {
        const contactRequest = req.body
        const savedContactRequest = await contactRequestService.rejectContact(contactRequest)
        res.status(200).json({ status: 'ok', content: savedContactRequest })
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", async (req, res) => {
    try {
        const filterBy = req.query
        const requests = await contactRequestService.query(filterBy)
        res.status(200).json({ status: 'ok', content: requests })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
});

module.exports = router;