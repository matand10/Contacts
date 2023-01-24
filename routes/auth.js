const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const dbService = require('../services/db.service')
const userService = require('../services/user.service')

//REGISTER
router.post("/register", async (req, res) => {
  const { email, username, password } = JSON.parse(req.body.data)
  try {
    const saltRounds = 10
    if (!username || !password) return Promise.reject('fullname, username and password are required!')
    const hash = await bcrypt.hash(password, saltRounds)
    let userToAdd = await userService.add({ username, password: hash, isAdmin: false, email })
    res.status(201).json(userToAdd);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = JSON.parse(req.body.data)
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ username })
    if (!user) res.status(401).json("Wrong credentials!")
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')
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
    delete user.password
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
})

module.exports = router;
