// const Product = require("../models/Product");
const dbService = require('../services/db.service');
const { getFirstLetterUppercase } = require('../services/util.service');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const ObjectId = require('mongodb').ObjectId
const router = require("express").Router();

//CREATE

// router.post("/", verifyTokenAndAdmin, async (req, res) => {
//   const newProduct = new Product(req.body);

//   try {
//     const savedProduct = await newProduct.save();
//     res.status(200).json(savedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json("Product has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET PRODUCT
router.get("/find/:id", async (req, res) => {
  const { id } = req.params
  try {
    const collection = await dbService.getCollection('contact')
    const contact = await collection.findOne({ _id: ObjectId(id) })
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CONTACTS
router.get("/", async (req, res) => {
  try {
    const collection = await dbService.getCollection('product')
    const contacts = await collection.find({}).toArray()
    res.status(200).json(contacts)
  } catch (err) {
    res.status(500).json(err);
    throw err
  }
});

router.get("/:category", async (req, res) => {
  const cat = req.params.category
  try {
    const collection = await dbService.getCollection('contact')
    const entities = await collection.find({ desc: getFirstLetterUppercase(cat) }).toArray()
    res.status(200).json(entities)
  } catch (err) {
    res.status(500).json(err);
    throw err
  }
})

// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   try {
//     let products;
//     if (qNew) {
//       products = await Product.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       products = await Product.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       products = await Product.find();
//     }

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

function _buildCriteria(filterBy) {
  let criteria = {}
  return criteria
}

module.exports = router;
