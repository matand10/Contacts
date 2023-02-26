const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

module.exports = {
    validateToken
}