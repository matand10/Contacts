
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId
const Contact = require("../models/Contact");

const COLLECTION_KEY = 'contact'

module.exports = {
    add,
    update
}

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
            agents: updatedContact.agents,
            img: updatedContact.img,
            createdAt: updatedContact.createdAt,
        }
        const collection = await dbService.getCollection(COLLECTION_KEY)
        await collection.updateOne({ '_id': contactToSave._id }, { $set: contactToSave })
        return updatedContact;
    } catch (err) {
        throw err
    }
}

module.exports = {
    add
}