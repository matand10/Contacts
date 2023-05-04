const User = require("../models/User");
const dbService = require('../services/db.service')
const userService = require('../services/user.service')
const bcrypt = require('bcrypt')
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyAdmin,
  verifyToken,
} = require("./verifyToken");

const router = require("express").Router();

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
router.post("/remove/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { userId } = req.body
    await userService.remove(userId)
    res.status(200).json({ status: 'ok', content: userId })
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.post("/update", verifyToken, async (req, res) => {
  try {
    const { updatedUser } = req.body
    const savedUser = await userService.update(updatedUser)
    res.status(200).json({ status: 'ok', content: savedUser })
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.post("/find/:id", async (req, res) => {
  try {
    const { userId } = req.body
    const user = await userService.getById(userId)
    res.status(200).json({ status: 'ok', content: user });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const filterBy = req.body
    const users = await userService.query(filterBy)
    res.status(200).json({ status: 'ok', content: users });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE USER
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { userCred } = req.body
    const saltRounds = 10
    const hash = await bcrypt.hash(userCred.password, saltRounds)
    const userToCreate = {
      username: userCred.username,
      password: hash,
      fullname: userCred.fullname,
      email: userCred.email,
      phone: userCred.phone,
      address: userCred.address,
      active: userCred.active,
      gender: userCred.gender,
      permissions: userCred.permissions,
    }
    if (!userCred.username || !userCred.password) return Promise.reject('fullname, username and password are required!')
    const newUser = new User(userToCreate)
    const savedUser = await userService.add(newUser)

    res.status(200).json({ status: 'ok', content: savedUser })
  } catch (err) {
    res.status(500).json({ status: 'error' })
  }
})

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
