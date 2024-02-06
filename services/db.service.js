// const MongoClient = require('mongodb').MongoClient
const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

// module.exports = {
//     getCollection
// }

const MONGO_URL = process.env.NODE_ENV !== "production" ? process.env.MONGO_URL : 'mongodb://localhost:27017/qleads'

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to DB");
})


// const dbName = 'qleads'
// var dbConn = null

// async function getCollection(collectionName) {
//     try {
//         const db = await connect()
//         const collection = await db.collection(collectionName)
//         return collection
//     } catch (err) {
//         throw err
//     }
// }

// async function connect() {
//     if (dbConn) return dbConn
//     try {
//         const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//         const db = client.db(dbName)
//         dbConn = db
//         return db
//     } catch (err) {
//         throw err
//     }
// }