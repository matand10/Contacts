const dbService = require('./db.service')
const userService = require('./user.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_KEY = 'contact_transaction'

async function get() {
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

async function add(credit) {
    try {
        collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.insertOne(credit)
        // await Promise.all(
        //     credits.map(credit => collection.insertOne(credit))
        // )
        return credit
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
    get,
    update,
    add,
    remove,
}