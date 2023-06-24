const userService = require('./user.service')
const dbService = require('../../services/db.service')

//DELETE
async function removeUser(req, res) {
    try {
        const { userId } = req.body
        await userService.remove(userId)
        res.status(200).json({ status: 'ok', content: userId })
    } catch (err) {
        res.status(500).json(err);
    }
}

//UPDATE
async function updateUser(req, res) {
    try {
        const { updatedUser } = req.body
        const savedUser = await userService.update(updatedUser)
        res.status(200).json({ status: 'ok', content: savedUser })
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET USER
async function getById(req, res) {
    try {
        const { userId } = req.body
        const user = await userService.getById(userId)
        res.status(200).json({ status: 'ok', content: user });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL USER
async function getUsers(req, res) {
    try {
        const filterBy = req.body
        const users = await userService.query(filterBy)
        res.status(200).json({ status: 'ok', content: users });
    } catch (err) {
        res.status(500).json(err);
    }
}

// CREATE USER
async function createUser(req, res) {
    try {
        const { userCred } = req.body
        const savedUser = await userService.add(userCred)
        res.status(200).json({ status: 'ok', content: savedUser })
    } catch (err) {
        res.status(500).json({ status: 'error' })
    }
}

//GET USER STATS
async function getUserStats(req, res) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const collection = await dbService.getCollection('user');
        const users = await collection.aggregate([
            {
                $match: { createdAt: { $gte: lastYear } }
            },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]).toArray();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    removeUser,
    updateUser,
    getById,
    getUsers,
    createUser,
    getUserStats,
}
