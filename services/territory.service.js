// const JobTitle = require('../models/JobTitle')
// const Territory = require('../models/Territory')
// const dbService = require('./db.service')
// const ObjectId = require('mongodb').ObjectId

// async function get() {
//     try {
//         const collection = await dbService.getCollection('territory')
//         let entities = await collection.find({}).toArray()
//         return entities
//     } catch (err) {
//         throw err
//     }
// }

// async function update(entity) {
//     try {
//         const entityToSave = {
//             ...entity,
//             _id: ObjectId(entity._id),
//         }
//         const collection = await dbService.getCollection('territory')
//         await collection.updateOne({ '_id': entityToSave._id }, { $set: entityToSave })
//     } catch (err) {
//         throw err
//     }
// }

// async function add(entity) {
//     try {
//         const entityToSave = {
//             territoryName: entity.title
//         }
//         const savedEntity = new Territory(entityToSave)
//         const collection = await dbService.getCollection('territory')
//         await collection.insertOne(savedEntity)
//         return savedEntity
//     } catch (err) {
//         throw err
//     }
// }

// async function remove(entityId) {
//     try {
//         const collection = await dbService.getCollection('territory')
//         await collection.deleteOne({ '_id': ObjectId(entityId) })
//     } catch (err) {
//         throw err
//     }
// }


// module.exports = {
//     get,
//     update,
//     add,
//     remove,
// }