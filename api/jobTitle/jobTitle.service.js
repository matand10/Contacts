const JobTitle = require('./jobTitle.model')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const jobTitles = await JobTitle.find({})
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

        const updatedJobTitle = await JobTitle.findByIdAndUpdate(
            catToSave._id,
            { $set: catToSave },
            { new: true } // Return the updated document
        );

        // const collection = await dbService.getCollection('jobTitle')
        // await collection.updateOne({ '_id': catToSave._id }, { $set: catToSave })
        return updatedJobTitle
    } catch (err) {
        throw err
    }
}

async function add(payload) {
    try {
        const jobTitleToSave = {
            title: payload.jobTitleName,
            value: payload.jobTitleName.toLowerCase()
        }
        const newJobTitle = new JobTitle(jobTitleToSave)
        const savedJobTitle = await newJobTitle.save()

        // const collection = await dbService.getCollection('jobTitle')
        // await collection.insertOne(savedJobTitle)
        return savedJobTitle
    } catch (err) {
        throw err
    }
}

async function remove(jobTitleId) {
    try {
        await JobTitle.deleteOne({ '_id': ObjectId(jobTitleId) })
        // const collection = await dbService.getCollection('jobTitle')
        // await collection.deleteOne({ '_id': ObjectId(jobTitleId) })
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