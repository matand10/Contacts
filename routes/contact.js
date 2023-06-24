// const dbService = require('../services/db.service');
// const contactService = require('../services/contact.service')
// const { getFirstLetterUppercase } = require('../services/util.service');
// const { verifyTokenAndAdmin, validateToken } = require("./verifyToken");
// const ObjectId = require('mongodb').ObjectId
// const router = require("express").Router();

// // GET USER CONTACTS 
// router.post("/user", validateToken, async (req, res) => {
//   try {
//     const { userId } = req.body
//     const contacts = await contactService.getContactsByUserId(userId)
//     res.status(200).json({ status: 'ok', content: contacts })
//   } catch (err) {
//     res.status(500).json(err);
//     throw err
//   }
// });

// // ADD
// router.post("/create", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const { contact } = req.body
//     const savedContact = await contactService.add(contact)
//     res.status(200).json({ status: 'ok', content: savedContact });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // UPDATE
// router.post("/update/:id", verifyTokenAndAdmin, async (req, res) => {
//   const { contact } = req.body
//   try {
//     const id = ObjectId(contact._id)
//     delete contact._id
//     const collection = await dbService.getCollection('contact')
//     await collection.updateOne({ _id: id }, { $set: { ...contact } })
//     const updatedContact = await collection.findOne({ _id: id })
//     res.status(200).json({ status: 'ok', content: updatedContact });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // //DELETE
// router.post("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const { id } = req.body
//     const collection = await dbService.getCollection('contact')
//     await collection.deleteOne({ _id: ObjectId(id) })
//     res.status(200).json({ status: 'ok' });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET CONTACT
// router.get("/find/:id", async (req, res) => {
//   const { id } = req.params
//   try {
//     const collection = await dbService.getCollection('contact')
//     const contact = await collection.findOne({ _id: ObjectId(id) })
//     res.status(200).json({ status: 'ok', content: contact });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL CONTACTS
// router.post("/", async (req, res) => {
//   try {
//     const filterBy = req.body
//     const contacts = await contactService.query(filterBy)
//     res.status(200).json({ status: 'ok', content: contacts })
//   } catch (err) {
//     res.status(500).json(err);
//     throw err
//   }
// });

// router.get("/:category", async (req, res) => {
//   const cat = req.params.category
//   try {
//     const collection = await dbService.getCollection('contact')
//     const entities = await collection.find({ desc: getFirstLetterUppercase(cat) }).toArray()
//     res.status(200).json(entities)
//   } catch (err) {
//     res.status(500).json(err);
//     throw err
//   }
// })

// module.exports = router;
