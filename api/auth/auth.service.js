const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
const nodemailer = require("nodemailer")
const { getOTPEmail } = require('../../constants/email')
const bcrypt = require('bcrypt')
const User = require('../user/user.model')

const dbService = require('../../services/db.service')
const utilService = require('../../services/util.service')

const TEMP_OTP = {}

function validateToken(res) {
    try {
        const json = cryptr.decrypt(res.cookies.loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

async function login(username) {
    try {
        const user = await User.findOne({ username })
        return user
    } catch (err) {
        throw err
    }
}

async function sendEmail({ email }) {
    try {
        const OTP = utilService.generateRandomNumber(4)
        TEMP_OTP.email = email
        TEMP_OTP.otp = OTP

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        const message = {
            from: '"Fred Foo 👻" <matandamary10@gmail.com>',
            to: email,
            subject: 'Hello ✔',
            text: 'Hello world?',
            html: getOTPEmail(OTP),
        };

        await transporter.sendMail(message);
    } catch (err) {
        throw err
    }
}

function isOTPValid({ OTP }) {
    const userOTP = OTP.join('')
    const { email, otp } = TEMP_OTP
    TEMP_OTP = {}
    return userOTP === otp
}

async function encodeUserPassword(password) {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
}

module.exports = {
    validateToken,
    login,
    sendEmail,
    isOTPValid,
    encodeUserPassword,
}