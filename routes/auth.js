const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const dbService = require('../services/db.service')
const userService = require('../services/user.service');
const { verifyTokenAndAdmin, verifyAdmin } = require("./verifyToken");
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

//REGISTER
router.post("/register", async (req, res) => {
  const user = JSON.parse(req.body.data)
  try {
    const saltRounds = 10
    const hash = await bcrypt.hash(user.password, saltRounds)
    const content = {
      username: user.username,
      password: hash,
      fullName: `${user.name} ${user.lastName}`,
      email: user.email
    }
    const newUser = new User(content)

    if (!user.username || !user.password) return Promise.reject('fullname, username and password are required!')
    let userToAdd = await userService.add(newUser)
    const loginToken = getLoginToken(userToAdd)
    res.cookie('loginToken', loginToken)
    res.status(201).json({ status: 'ok' });
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
    const loginToken = getLoginToken(user)
    delete user.password
    res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true });
    // res.cookie('loginToken', loginToken)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie('loginToken')
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
})

router.post("/isAdmin", verifyAdmin, async (req, res) => {
  try {
    res.send({ status: 'ok' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to verify' })
  }
})

function getLoginToken(user) {
  return cryptr.encrypt(JSON.stringify(user))
}


module.exports = router;
