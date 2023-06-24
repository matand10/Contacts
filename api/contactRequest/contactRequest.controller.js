const contactRequestService = require("./contactRequest.service")

//CREATE
async function create(req, res) {
    try {
        const { contactRequest } = req.body
        await contactRequestService.add(contactRequest)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = req.body
        await contactRequestService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//UPDATE
async function update(req, res) {
    try {
        const contactRequest = req.body
        const savedContactRequest = await contactRequestService.approveContact(contactRequest)
        res.status(200).json({ status: 'ok', content: savedContactRequest })
    } catch (err) {
        res.status(500).json(err);
    }
}

// Reject
async function reject(req, res) {
    try {
        const contactRequest = req.body
        const savedContactRequest = await contactRequestService.rejectContact(contactRequest)
        res.status(200).json({ status: 'ok', content: savedContactRequest })
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL
async function query(req, res) {
    try {
        const filterBy = req.query
        const requests = await contactRequestService.query(filterBy)
        res.status(200).json({ status: 'ok', content: requests })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    create,
    remove,
    query,
    reject,
    update
};