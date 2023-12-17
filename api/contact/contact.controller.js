// Services
const dbService = require('../../services/db.service');
const contactService = require('./contact.service')
const { getFirstLetterUppercase } = require('../../services/util.service');

const ObjectId = require('mongodb').ObjectId

// GET USER CONTACTS 
async function getUserContacts(req, res) {
    try {
        const { userId } = req.body
        const contacts = await contactService.getContactsByUserId(userId)
        res.status(200).json({ status: 'ok', content: contacts })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

// ADD
async function add(req, res) {
    try {
        const { contact } = req.body
        const savedContact = await contactService.add(contact)
        res.status(200).json({ status: 'ok', content: savedContact });
    } catch (err) {
        res.status(500).json(err);
    }
}

// ADD MANY
async function addMany(req, res) {
    try {
        const { contact } = req.body
        const savedContacts = await contactService.addMany(contact)
        res.status(200).json({ status: 'ok', content: savedContacts })
    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE
async function update(req, res) {
    const { contact } = req.body
    try {
        const id = ObjectId(contact._id)
        delete contact._id
        const collection = await dbService.getCollection('contact')
        await collection.updateOne({ _id: id }, { $set: { ...contact } })
        const updatedContact = await collection.findOne({ _id: id })
        res.status(200).json({ status: 'ok', content: updatedContact });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = req.body
        const collection = await dbService.getCollection('contact')
        await collection.deleteOne({ _id: ObjectId(id) })
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET CONTACT
async function getById(req, res) {
    const { id } = req.params
    try {
        const collection = await dbService.getCollection('contact')
        const contact = await collection.findOne({ _id: ObjectId(id) })
        res.status(200).json({ status: 'ok', content: contact });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL CONTACTS
async function getContacts(req, res) {
    try {
        const filterBy = req.body
        const contacts = await contactService.query(filterBy)
        res.status(200).json({ status: 'ok', content: contacts })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

async function getContactByCategories(req, res) {
    const cat = req.params.category
    try {
        const contacts = await contactService.getContactByCategories(getFirstLetterUppercase(cat))
        res.status(200).json({ status: 'ok', content: contacts })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    add,
    addMany,
    update,
    remove,
    getById,
    getContacts,
    getUserContacts,
    getContactByCategories,
}