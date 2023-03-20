const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const collection = await dbService.getCollection('category')
        let categories = await collection.find({}).toArray()
        return categories
    } catch (err) {
        throw err
    }
}

async function update(category) {
    try {
        const catToSave = {
            ...category,
            _id: ObjectId(category._id),
        }
        const collection = await dbService.getCollection('category')
        await collection.updateOne({ '_id': catToSave._id }, { $set: catToSave })
    } catch (err) {
        throw err
    }
}

module.exports = {
    get,
    update,
}