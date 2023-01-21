const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const dbService = require('../services/db.service')

//REGISTER
router.post("/register", async (req, res) => {
  const { email, username, password } = JSON.parse(req.body.data)
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({
    username: username,
    email: email,
    password: hash
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = JSON.parse(req.body.data)

  const collection = await dbService.getCollection('user')
  const user = await collection.findOne({ username })
  if (!user) res.status(401).json("Wrong credentials!")
  // const user = await User.findOne({ username });
  const match = await bcrypt.compare(password, user.password)
  if (!match) return Promise.reject('Invalid username or password')
  console.log('match', match)
  // res.status(200).json(user)

  // const accessToken = jwt.sign(
  //   {
  //     id: user._id,
  //     isAdmin: user.isAdmin,
  //   },
  //   process.env.JWT_SEC,
  //   { expiresIn: "3d" }
  // );

  // const { pass, ...others } = user._doc;
  // res.status(200).json({ ...others, accessToken });
  // res.status(500).json(err);
});

router.post("/logout", async (req, res) => {
  try {
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
})

module.exports = router;
