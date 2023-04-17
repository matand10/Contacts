const Credit = require('../models/Credit')
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_KEY = 'credit'

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

async function add(entity) {
    try {
        const entityToSave = {
            entity: entity.title,
            category: entity.category
        }
        const savedEntity = new Credit(entityToSave)
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.insertOne(savedEntity)
        return savedEntity
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