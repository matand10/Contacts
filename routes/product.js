// const dbService = require('../services/db.service');
// const router = require("express").Router();

// //GET ALL PRODUCTS
// router.get("/", async (req, res) => {
//     try {
//         const collection = await dbService.getCollection('product')
//         const contacts = await collection.find({}).toArray()
//         res.status(200).json(contacts)
//     } catch (err) {
//         res.status(500).json(err);
//         throw err
//     }
// });


// module.exports = router;