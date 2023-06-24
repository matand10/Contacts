const User = require("../user/user.model");
const bcrypt = require('bcrypt')
const userService = require('../user/user.service');
const authService = require('./auth.service')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')


// REGISTER
async function register(req, res) {
    try {
        const user = req.body
        const saltRounds = 10
        const hash = await bcrypt.hash(user.password, saltRounds)
        const content = {
            username: user.username,
            password: hash,
            fullname: user.fullname,
            email: user.email
        }

        if (!user.username || !user.password) return Promise.reject('fullname, username and password are required!')
        const newUser = new User(content)
        let userToAdd = await userService.create(newUser)

        const loginToken = getLoginToken(userToAdd)
        res.cookie('loginToken', loginToken)
        res.status(201).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//LOGIN
async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username)
        if (!user) return res.status(401).json("Wrong credentials!")
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json("Wrong credentials!")
        const loginToken = getLoginToken(user)
        delete user.password
        res.cookie('loginToken', loginToken)
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// LOGOUT
async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

async function isAdmin(req, res) {
    try {
        res.send({ status: 'ok' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to verify' })
    }
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify({ _id: user._id, isAdmin: user.isAdmin }))
}

module.exports = {
    register,
    login,
    logout,
    isAdmin,
    getLoginToken,
}