const Category = require('./category.model')
const dbService = require('../../services/db.service')
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

async function remove(catId) {
    try {
        const collection = await dbService.getCollection('category')
        await collection.deleteOne({ '_id': ObjectId(catId) })
    } catch (err) {
        throw err
    }
}

async function add(category) {
    try {
        const catToSave = {
            title: category.title,
            cat: category.title.toLowerCase()
        }
        const newCategory = new Category(catToSave)
        const collection = await dbService.getCollection('category')
        await collection.insertOne(newCategory)
        return newCategory
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