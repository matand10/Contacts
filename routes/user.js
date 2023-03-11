const { requireAdmin } = require("../middlewares/requireAuth.middleware");
const User = require("../models/User");
const dbService = require('../services/db.service')
const userService = require('../services/user.service')
const bcrypt = require('bcrypt')
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyAdmin,
} = require("./verifyToken");

const { getUsersOneWeekAgo } = require('../services/util.service')

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

//UPDATE
router.post("/update", requireAdmin, async (req, res) => {
  try {
    const { userCred } = JSON.parse(req.body.data)
    const savedUser = await userService.update(userCred)
    res.status(200).json({ status: 'ok', content: savedUser })
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.post("/find/:id", requireAdmin, async (req, res) => {
  try {
    const { userId } = JSON.parse(req.body.data)
    const user = await userService.getById(userId)
    res.status(200).json({ status: 'ok', content: user });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { filterBy } = JSON.parse(req.body.data)
    const users = await userService.query(filterBy)
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE USER
router.post("/create", verifyAdmin, async (req, res) => {
  try {
    const { userCred } = JSON.parse(req.body.data)
    const saltRounds = 10
    const hash = await bcrypt.hash(userCred.password, saltRounds)
    const content = {
      username: userCred.username,
      password: hash,
      fullname: userCred.fullname,
      email: userCred.email,
      phone: userCred.phone,
      address: userCred.address,
      active: userCred.active
    }
    if (!userCred.username || !userCred.password) return Promise.reject('fullname, username and password are required!')
    const newUser = new User(content)

    const collection = await dbService.getCollection('user')
    const addedUser = await collection.insertOne(newUser)

    res.status(200).json({ status: 'ok', content: newUser })
  } catch (err) {
    res.status(500).json({ status: 'error' })
  }
})

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
