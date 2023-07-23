
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const Token = require('../../models/Token')
const config = require('../../config')

const emailService = require('../../services/email.service')
const authService = require('../auth/auth.service')
const utilService = require('../../services/util.service')

const COLLECTION_KEY = 'user'

// Services
const dbService = require('../../services/db.service')
const purchaseStatus = require('../../constants/PurchaseStatus')
const contactTransType = require('../../constants/contactTransType')

// Models
const ContactSale = require('../../models/ContactSale')
const Notification = require('../../models/Notification')
const User = require('./user.model')
const { CREDIT_VALUE } = require('../../constants/credit')

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
            income: updatedUser.income
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
        const saltRounds = Number(process.env.SALT)
        const hash = await bcrypt.hash(user.password, saltRounds)
        const content = {
            username: user.username,
            password: hash,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone
        }

        const newUser = new User(content)
        const savedUser = await newUser.save()

        try {
            const token = await new Token({
                userId: savedUser._id,
                token: utilService.generateRandomNumber(10)
            })
            const savedToken = await token.save()
            const url = `https://qleads.mobi/api/users/${savedUser._id}/verify/${savedToken.token}`
            await emailService(savedUser.email, "Verify Email", url)
        } catch (err) {
            throw new Error('Cannot send verification link')
        }

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
        const userToUpdate = { ...user }
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
            userToUpdate.income += (CREDIT_VALUE / 2)
            userToUpdate.contactTransactions.unshift(saleTransaction)
            const updatedUser = await update(userToUpdate)
            return { status: purchaseStatus.success, saleTransaction: saleTransaction, updatedUser }
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

async function changeUserPassByEmail(email, password) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        const user = await collection.findOne({ 'email': 'matandamary10@gmail.com' })
        const encryptedPass = await authService.encodeUserPassword(password)
        const userToSave = { ...user, password: encryptedPass }
        if (user) {
            await collection.updateOne({ '_id': user._id }, { $set: userToSave })
            return true
        } else {
            throw new Error('Cannot find user matching this email:', email)
        }
    } catch (err) {
        throw err
    }
}

async function sendEmailVerification(user) {
    try {
        let userToken = await Token.findOne({ userId: new ObjectId(user._id) })

        if (!userToken) {
            const token = await new Token({
                userId: user._id,
                token: utilService.generateRandomNumber(10)
            })
            userToken = await token.save()
        }

        const url = `https://qleads.mobi/api/users/${user._id}/verify/${userToken.token}`
        await emailService(user.email, "Verify Email", url)
    } catch (error) {
        throw error
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
    changeUserPassByEmail,
    sendEmailVerification,
}