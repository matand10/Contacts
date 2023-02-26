const authService = require('../services/auth.service')

async function requireAdmin(req, res, next) {
    const { user } = JSON.parse(req.body.data)
    if (!user || !user.isAdmin) return res.status(401).send('Not Authenticated')
    next()
}

module.exports = {
    requireAdmin
}
