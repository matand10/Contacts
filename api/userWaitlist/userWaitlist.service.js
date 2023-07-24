const UserWaitlist = require('./userWaitlist.model')
const User = require('../user/user.model')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const users = await UserWaitlist.find({})
        return users
    } catch (err) {
        throw err
    }
}

async function update(user, status) {
    try {
        const userToApprove = {
            ...user,
            _id: ObjectId(user._id),
            isApproved: status
        }
        await User.findByIdAndUpdate(ObjectId(user.userId), { $set: { isApproved: status } })
        const res = await UserWaitlist.findByIdAndUpdate(ObjectId(user._id), { ...userToApprove }, { new: true })
        return res
    } catch (err) {
        throw err
    }
}

async function add(user) {
    try {
        const userRequestToSave = {
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            userId: ObjectId(user._id),
        }
        const saveUserRequest = await new UserWaitlist(userRequestToSave).save()
        return saveUserRequest
    } catch (err) {
        throw err
    }
}

async function remove(jobTitleId) {
    try {
        const collection = await dbService.getCollection('jobTitle')
        await collection.deleteOne({ '_id': ObjectId(jobTitleId) })
    } catch (err) {
        throw err
    }
}


module.exports = {
    get,
    update,
    add,
    remove,
}