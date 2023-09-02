const Country = require('./country.model')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_KEY = 'credit'

async function query() {
    try {
        const countries = await Country.find({});
        return countries
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
        const savedEntity = new Country(entityToSave)
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
    query,
    update,
    add,
    remove,
}