const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_KEY = 'credit_transaction'

async function query() {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        const entities = await collection.find({}).toArray()
        return entities
    } catch (err) {
        throw err
    }
}

async function update(entity) {
    try {
        const updatedEntity = {
            ...entity,
            _id: ObjectId(entity._id),
        }
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.updateOne({ '_id': updatedEntity._id }, { $set: updatedEntity })
    } catch (err) {
        throw err
    }
}

async function add(credits) {
    try {
        collection = await dbService.getCollection(COLLECTION_KEY)
        await Promise.all(
            credits.map(credit => collection.insertOne(credit))
        )
        return credits
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
    update,
    add,
    remove,
}