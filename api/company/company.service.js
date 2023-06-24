const Company = require('./company.model')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const collection = await dbService.getCollection('company')
        const companies = await collection.find({}).toArray()
        return companies
    } catch (err) {
        throw err
    }
}

async function update(company) {
    try {
        const updatedCompany = {
            ...company,
            _id: ObjectId(company._id),
        }
        const collection = await dbService.getCollection('company')
        await collection.updateOne({ '_id': updatedCompany._id }, { $set: updatedCompany })
    } catch (err) {
        throw err
    }
}

async function add(company) {
    try {
        const companyToSave = {
            company: company.title,
            category: company.category
        }
        const savedCompany = new Company(companyToSave)
        const collection = await dbService.getCollection('company')
        await collection.insertOne(savedCompany)
        return savedCompany
    } catch (err) {
        throw err
    }
}

async function remove(companyId) {
    try {
        const collection = await dbService.getCollection('company')
        await collection.deleteOne({ '_id': ObjectId(companyId) })
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