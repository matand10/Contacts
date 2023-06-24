const JobTitle = require('./jobTitle.model')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const collection = await dbService.getCollection('jobTitle')
        let jobTitles = await collection.find({}).toArray()
        return jobTitles
    } catch (err) {
        throw err
    }
}

async function update(jobTitle) {
    try {
        const catToSave = {
            ...jobTitle,
            _id: ObjectId(jobTitle._id),
        }
        const collection = await dbService.getCollection('jobTitle')
        await collection.updateOne({ '_id': catToSave._id }, { $set: catToSave })
    } catch (err) {
        throw err
    }
}

async function add(jobTitle) {
    try {
        const jobTitleToSave = {
            title: jobTitle.title,
            value: jobTitle.title.toLowerCase()
        }
        const savedJobTitle = new JobTitle(jobTitleToSave)
        const collection = await dbService.getCollection('jobTitle')
        await collection.insertOne(savedJobTitle)
        return savedJobTitle
    } catch (err) {
        throw err
    }
}

async function remove(jobTitleId) {
    try {
        const collection = await dbService.getCollection('jobTitle')
        await collection.deleteOne({ '_id': ObjectId(jobTitleId) })
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