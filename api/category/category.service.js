const Category = require('./category.model')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const categories = await Category.find({})
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
        await Category.updateOne({ '_id': catToSave._id }, { $set: catToSave })
        // const collection = await dbService.getCollection('category')
        // await collection.updateOne({ '_id': catToSave._id }, { $set: catToSave })
    } catch (err) {
        throw err
    }
}

async function remove(catId) {
    try {
        await Category.deleteOne({ '_id': ObjectId(catId) })
        // const collection = await dbService.getCollection('category')
        // await collection.deleteOne({ '_id': ObjectId(catId) })
    } catch (err) {
        throw err
    }
}

async function add(payload) {
    try {
        const catToSave = {
            title: payload.category,
            cat: payload.category.toLowerCase()
        }
        const newCategory = await Category(catToSave)
        const savedCategory = await newCategory.save()
        // const collection = await dbService.getCollection('category')
        // await collection.insertOne(newCategory)
        return savedCategory
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