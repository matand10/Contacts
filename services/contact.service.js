
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const Contact = require("../models/Contact");

module.exports = {
    add
}

async function add(contact) {
    try {
        const newContact = new Contact(contact)
        const collection = await dbService.getCollection('contact')
        await collection.insertOne(newContact)
        return newContact
    } catch (err) {
        throw err
    }
}

module.exports = {
    add
}