
const dbService = require('./db.service')
const contactService = require('./contact.service')
const ObjectId = require('mongodb').ObjectId
const ContactRequest = require("../models/ContactRequest");

const COLLECTION_KEY = 'contact_request'

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

async function add(entitiy) {
    try {
        const newEntity = new ContactRequest(entitiy)
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.insertOne(newEntity)
        return newEntity
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

async function update(entity) {
    try {
        // peek only updatable fields!
        const entitiyToSave = {
            ...entity,
            _id: ObjectId(entity._id),
            isApproved: _approveContact(entity),
            status: _approveContact(entity) ? 'ok' : 'rejected',
            updatedAt: new Date(),
        }
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.updateOne({ '_id': entitiyToSave._id }, { $set: entitiyToSave })
        return entitiyToSave
    } catch (err) {
        throw err
    }
}

async function approveContact(entity) {
    try {
        if (!entity.isApproved) {
            entity.contact.inStock = true
            await contactService.update(entity.contact)
        }
        return await update(entity)
    } catch (err) {
        throw err
    }
}

async function rejectContact(entity) {
    try {
        return await update(entity)
    } catch (err) {
        throw err
    }
}

function _approveContact(entity) {
    if (entity.isApproved) return false
    else return true
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    add,
    remove,
    update,
    approveContact,
    rejectContact,
}