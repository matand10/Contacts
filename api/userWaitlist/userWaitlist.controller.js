const userWaitlistService = require("./userWaitlist.service")

//CREATE
async function create(req, res) {
    try {
        const { user } = req.body
        const savedRequest = await userWaitlistService.add(jobTitle)
        res.status(200).json({ status: 'ok', content: savedRequest });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const { user, status } = req.body
        const updatedUser = await userWaitlistService.update(user, status)
        res.status(200).json({ status: 'ok', content: updatedUser });
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE
async function remove(req, res) {
    try {
        const { id } = req.body
        await userWaitlistService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL JOB TITLES
async function query(req, res) {
    try {
        const users = await userWaitlistService.get()
        res.status(200).json({ status: 'ok', content: users })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    query,
    remove,
    create,
    update
};