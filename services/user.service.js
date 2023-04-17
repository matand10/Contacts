
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const purchaseStatus = require('../constants/PurchaseStatus')

const COLLECTION_KEY = 'user'

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    addCreditTransaction,
    addContactTransaction
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        let users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            return user
        })
        return users
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        throw err
    }
}
async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        throw err
    }
}

async function update(updatedUser) {
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: ObjectId(updatedUser._id),
            username: updatedUser.username,
            fullname: updatedUser.fullname,
            email: updatedUser.email,
            imgUrl: updatedUser.imgUrl,
            phone: updatedUser.phone,
            address: updatedUser.address,
            favorites: updatedUser.favorites,
            credits: updatedUser.credits,
            creditTransactions: updatedUser.creditTransactions,
            contactTransactions: updatedUser.contactTransactions,
        }
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        return updatedUser;
    } catch (err) {
        throw err
    }
}

async function add(user) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.insertOne(user)
        return user
    } catch (err) {
        throw err
    }
}

async function addCreditTransaction(transactions) {
    try {
        let savedUser
        await Promise.all(
            transactions.map(async transaction => {
                const { userId } = transaction
                const user = await getById(userId)
                const updatedUser = _updatePurchase(user, transaction)
                await update(updatedUser)
                savedUser = { status: 'success', updatedUser }
            })
        )
        return savedUser
    } catch (err) {
        throw err
    }
}

async function addContactTransaction(transactions, user) {
    try {
        let savedUser
        await Promise.all(
            transactions.map(async transaction => {
                const updatedUser = _updatePurchase(user, transaction)
                await update(updatedUser)
                savedUser = { status: 'success', updatedUser }
            })
        )
        return savedUser
    } catch (err) {
        throw err
    }
}

function _updatePurchase(user, transaction) {
    switch (transaction.type) {
        case 'credit_purchase':
            user.credits += transaction.creditQuantity
            user.creditTransactions.unshift(transaction)
            break
        case 'contact_purchase':
            user.credits -= transaction.contactPriceInCredit
            user.contactTransactions.unshift(transaction)
            break
    }
    return user
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.createdAt) {
        criteria.createdAt = {
            $gte: new Date(filterBy.createdAt.startOfWeek),
            $lt: new Date(filterBy.createdAt.endOfWeek)
        }
    }
    return criteria
}