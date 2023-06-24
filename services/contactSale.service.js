const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_KEY = 'contact_sale'

async function query(filterBy) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        const entities = await collection.find(filterBy).toArray()
        return entities
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

async function add(transaction) {
    try {
        collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.insertOne(transaction)
        return transaction
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.deleteOne({ '_id': ObjectId(entityId) })
    } catch (err) {
        throw err
    }
}

module.exports = {
    query,
    add,
    remove,
    getById,
}