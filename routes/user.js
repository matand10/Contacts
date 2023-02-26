const { requireAdmin } = require("../middlewares/requireAuth.middleware");
const User = require("../models/User");
const dbService = require('../services/db.service')
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const ObjectId = require('mongodb').ObjectId

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.post("/remove/:id", requireAdmin, async (req, res) => {
  try {
    const { userId } = JSON.parse(req.body.data)
    const collection = await dbService.getCollection('user')
    await collection.deleteOne({ _id: ObjectId(userId) })
    res.status(200).json({ status: 'ok', content: userId })
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const collection = await dbService.getCollection('user')
    const users = await collection.find({}).toArray()
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   const query = req.query.new;
//   try {
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET USER STATS
router.post("/stats", verifyAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const collection = await dbService.getCollection('user');
    const users = await collection.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } }
      },
      {
        $project: {
          month: { $month: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
    ]).toArray();
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
