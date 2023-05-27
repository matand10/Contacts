
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const purchaseStatus = require('../constants/PurchaseStatus')
const contactTransType = require('../constants/contactTransType')
const ContactTransaction = require('../models/ContactTransaction')
const ContactSale = require('../models/ContactSale')

const COLLECTION_KEY = 'user'

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    addCreditTransaction,
    addContactTransaction,
    removeContactTransaction,
    addContactTransactionSale,
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
            permissions: updatedUser.permissions,
            credits: updatedUser.credits,
            creditTransactions: updatedUser.creditTransactions,
            contactTransactions: updatedUser.contactTransactions,
            contactUploads: updatedUser.contactUploads,
            searchHistory: updatedUser.searchHistory,
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

async function addApprovedContact(user) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.insertOne(user)
        return user
    } catch (err) {
        throw err
    }
}

async function addCreditTransaction(transactions, userId) {
    try {
        let user = await getById(userId)
        transactions.forEach(trans => {
            user.credits += trans.creditQuantity
            user.creditTransactions.unshift(trans)
        })
        await update(user)
        return user
    } catch (err) {
        throw err
    }
}

async function addContactTransaction(transaction, user) {
    try {
        let savedUser
        const updatedUser = { ...user }
        updatedUser.credits -= transaction.priceInCredit
        updatedUser.contactTransactions.unshift(transaction)
        await update(updatedUser)
        savedUser = { status: purchaseStatus.success, updatedUser }
        return savedUser
    } catch (err) {
        throw err
    }
}

async function addContactTransactionSale(transaction, user) {
    try {
        const updatedUser = { ...user }
        const updatedSale = {
            type: contactTransType.contactSale,
            contact: transaction.contact,
            priceInCredit: transaction.priceInCredit,
            createdAt: transaction.createdAt,
            sellerUserId: user._id,
            buyingUserId: transaction.userId
        }

        const saleTransaction = new ContactSale(updatedSale)
        if (transaction.contact.agent._id === user._id.toString()) {
            updatedUser.credits += (saleTransaction.priceInCredit / 2)
            updatedUser.contactTransactions.unshift(saleTransaction)
            await update(updatedUser)
            return { status: purchaseStatus.success, saleTransaction: saleTransaction }
        } else return { status: purchaseStatus.failed }
    } catch (err) {
        throw err
    }
}

async function removeContactTransaction(transaction, user) {
    try {
        let savedUser
        const updatedUser = { ...user }
        updatedUser.credits += transaction.priceInCredit
        const updatedTransactions = updatedUser.contactTransactions.filter(trans => {
            return trans._id.toString() !== transaction._id.toString()
        })
        updatedUser.contactTransactions = updatedTransactions
        await update(updatedUser)
        savedUser = { status: purchaseStatus.success, updatedUser }
        return savedUser
    } catch (err) {
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.createdAt) {
        criteria.createdAt = {
            $gte: new Date(filterBy.createdAt.startOfWeek),
            $lt: new Date(filterBy.createdAt.endOfWeek)
        }
    }

    if (filterBy.transactionContactId) {
        criteria['contactTransactions.contact._id'] = filterBy.transactionContactId;
    }
    return criteria
}