const Company = require('./company.model')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function get() {
    try {
        const companies = await Company.find({})
        return companies
    } catch (err) {
        throw err
    }
}

async function update(company) {
    try {
        const companyToUpdate = {
            ...company,
            _id: ObjectId(company._id),
        }
        await Company.updateOne({ '_id': companyToUpdate._id }, { $set: companyToUpdate });
        // await collection.updateOne({ '_id': companyToUpdate._id }, { $set: companyToUpdate })
    } catch (err) {
        throw err
    }
}

async function add(payload) {
    try {
        const companyToSave = {
            company: payload.company,
            category: payload.category
        }

        const newCompany = await Company(companyToSave)
        const savedCompany = await newCompany.save()


        // const savedCompany = new Company(companyToSave)
        // const collection = await dbService.getCollection('company')
        // await collection.insertOne(savedCompany)
        return savedCompany
    } catch (err) {
        throw err
    }
}

async function remove(companyId) {
    try {
        await Company.deleteOne({ '_id': ObjectId(companyId) })
        // const collection = await dbService.getCollection('company')
        // await collection.deleteOne({ '_id': ObjectId(companyId) })
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