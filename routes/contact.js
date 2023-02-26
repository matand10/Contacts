// const Product = require("../models/Product");
const { requireAdmin } = require('../middlewares/requireAuth.middleware');
const dbService = require('../services/db.service');
const { getFirstLetterUppercase } = require('../services/util.service');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyAdmin,
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
router.post("/update/:id", requireAdmin, async (req, res) => {
  const { contact } = JSON.parse(req.body.data)
  try {
    var id = ObjectId(contact._id)
    delete contact._id
    const collection = await dbService.getCollection('contact')
    await collection.updateOne({ _id: id }, { $set: { ...contact } })
    const updatedContact = await collection.findOne({ _id: ObjectId(id) })
    res.status(200).json({ status: 'ok', content: updatedContact });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
router.post("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = JSON.parse(req.body.data)
    const collection = await dbService.getCollection('contact')
    await collection.deleteOne({ _id: ObjectId(id) })
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET CONTACT
router.get("/find/:id", async (req, res) => {
  const { id } = req.params
  try {
    const collection = await dbService.getCollection('contact')
    const contact = await collection.findOne({ _id: ObjectId(id) })
    res.status(200).json({ status: 'ok', content: contact });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CONTACTS
router.get("/", async (req, res) => {
  try {
    const collection = await dbService.getCollection('contact')
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
