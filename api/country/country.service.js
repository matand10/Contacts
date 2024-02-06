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

        const updatedCountry = await Country.findByIdAndUpdate(
            updatedEntity._id,
            { $set: updatedEntity },
            { new: true } // Return the updated document
        );

        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.updateOne({ '_id': updatedEntity._id }, { $set: updatedEntity })
        return updatedCountry
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
        const savedCountry = await savedEntity.save()

        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.insertOne(savedEntity)
        return savedCountry
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        Country.deleteOne({ '_id': ObjectId(entityId) })
        // const collection = await dbService.getCollection(COLLECTION_KEY)
        // await collection.deleteOne({ '_id': ObjectId(entityId) })
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