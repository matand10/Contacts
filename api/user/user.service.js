
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const COLLECTION_KEY = 'user'

// Services
const dbService = require('../../services/db.service')
const purchaseStatus = require('../../constants/PurchaseStatus')
const contactTransType = require('../../constants/contactTransType')

// Models
const ContactSale = require('../../models/ContactSale')
const Notification = require('../../models/Notification')
const User = require('./user.model')

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
        if (!userId) return null
        const collection = await dbService.getCollection(COLLECTION_KEY)
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        if (user) delete user.password
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
            notifications: updatedUser.notifications,
        }
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        return updatedUser;
    } catch (err) {
        throw err
    }
}

async function add(userCred) {
    try {
        const saltRounds = 10
        const hash = await bcrypt.hash(userCred.password, saltRounds)
        const userToCreate = {
            username: userCred.username,
            password: hash,
            fullname: userCred.fullname,
            email: userCred.email,
            phone: userCred.phone,
            address: userCred.address,
            active: userCred.active,
            gender: userCred.gender,
            permissions: userCred.permissions,
        }
        if (!userCred.username || !userCred.password) return Promise.reject('fullname, username and password are required!')
        const newUser = new User(userToCreate)

        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.insertOne(newUser)
        return newUser
    } catch (err) {
        throw err
    }
}

async function create(user) {
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

async function addNotification(user, type) {
    try {
        const updatedUser = { ...user }
        const message = _notificationType(type)
        const newNotification = new Notification({ message, type })
        updatedUser.notifications.unshift(newNotification)
        await update(updatedUser)
        return newNotification
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

function _notificationType(type) {
    switch (type) {
        case contactTransType.contactSale:
            return 'You have just made a sale!'
        case contactTransType.contactPurchase:
            return 'Someone has just made a purchase from you!'
        default:
            break;
    }
}

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    create,
    addCreditTransaction,
    addContactTransaction,
    removeContactTransaction,
    addContactTransactionSale,
    addNotification,
}