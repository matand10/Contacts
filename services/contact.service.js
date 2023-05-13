
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const Contact = require("../models/Contact");

const COLLECTION_KEY = 'contact'

async function add(contact) {
    try {
        const newContact = new Contact(contact)
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.insertOne(newContact)
        return newContact
    } catch (err) {
        throw err
    }
}

async function remove(entitiyId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.deleteOne({ '_id': ObjectId(entitiyId) })
    } catch (err) {
        throw err
    }
}

async function update(updatedContact) {
    try {
        // peek only updatable fields!
        const contactToSave = {
            _id: ObjectId(updatedContact._id),
            company: updatedContact.company,
            desc: updatedContact.desc,
            country: updatedContact.country,
            category: updatedContact.category,
            jobTitle: updatedContact.jobTitle,
            price: Number(updatedContact.price),
            inStock: updatedContact.inStock,
            name: updatedContact.name,
            familyName: updatedContact.familyName,
            email: updatedContact.email,
            mobile: updatedContact.mobile,
            phone: updatedContact.phone,
            linkedinLinks: updatedContact.linkedinLinks,
            img: updatedContact.img,
            createdAt: updatedContact.createdAt,
            agent: updatedContact.agent
        }
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.updateOne({ '_id': contactToSave._id }, { $set: contactToSave })
        return updatedContact;
    } catch (err) {
        throw err
    }
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        const entities = await collection.find(criteria).toArray()
        return entities
    } catch (err) {
        throw err
    }
}

async function getById(entityId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_KEY)
        const entity = await collection.findOne({ '_id': ObjectId(entityId) })
        return entity
    } catch (err) {
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.hasOwnProperty('inStock')) {
        if (filterBy.inStock) criteria.inStock = true
        else criteria.inStock = false
    }
    return criteria
}


module.exports = {
    query,
    getById,
    remove,
    add,
    update,
}