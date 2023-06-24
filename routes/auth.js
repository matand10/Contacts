// const router = require("express").Router();
// const User = require("../models/User");
// const bcrypt = require('bcrypt')
// const userService = require('../services/user.service');
// const authService = require('../services/auth.service')
// const Cryptr = require('cryptr')
// const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
// const { verifyTokenAndAdmin } = require("./verifyToken");

// //REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const user = req.body
//     const saltRounds = 10
//     const hash = await bcrypt.hash(user.password, saltRounds)
//     const content = {
//       username: user.username,
//       password: hash,
//       fullname: user.fullname,
//       email: user.email
//     }
//     const newUser = new User(content)

//     if (!user.username || !user.password) return Promise.reject('fullname, username and password are required!')
//     let userToAdd = await userService.add(newUser)
//     const loginToken = getLoginToken(userToAdd)
//     res.cookie('loginToken', loginToken)
//     res.status(201).json({ status: 'ok' });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //LOGIN
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body
//   try {
//     const user = await authService.login(username)
//     if (!user) return res.status(401).json("Wrong credentials!")
//     const match = await bcrypt.compare(password, user.password)
//     if (!match) return res.status(401).json("Wrong credentials!")
//     const loginToken = getLoginToken(user)
//     delete user.password
//     res.cookie('loginToken', loginToken)
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post("/logout", async (req, res) => {
//   try {
//     res.clearCookie('loginToken')
//     res.send({ msg: 'Logged out successfully' })
//   } catch (err) {
//     res.status(500).send({ err: 'Failed to logout' })
//   }
// })

// router.post("/isAdmin", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     res.send({ status: 'ok' })
//   } catch (err) {
//     res.status(500).send({ err: 'Failed to verify' })
//   }
// })

// function getLoginToken(user) {
//   return cryptr.encrypt(JSON.stringify({ _id: user._id, isAdmin: user.isAdmin }))
// }


// module.exports = router;
