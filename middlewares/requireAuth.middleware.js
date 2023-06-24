// const authService = require('../services/auth.service')

// async function requireAdmin(req, res, next) {
//     const { user } = JSON.parse(req.body.data)
//     if (!user || !user.isAdmin) return res.status(401).send('Not Authenticated')
//     next()
// }

// module.exports = {
//     requireAdmin
// }

const dbService = require('../services/db.service')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

function validateToken(req, res, next) {
    const json = cryptr.decrypt(req.cookies.loginToken)
    const loggedinUser = JSON.parse(json)
    if (loggedinUser) return next()
    return res.status(401).json("You are not authenticated!");
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params._id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyAdmin = async (req, res, next) => {
    const { user } = JSON.parse(req.body.data)
    const { username, isAdmin } = user
    const collection = await dbService.getCollection('user')
    const dbUser = await collection.findOne({ username })
    if (isAdmin && dbUser.username === username) {
        next();
    } else {
        res.status(403).json("You are not alowed to do that!");
    }
}


const verifyToken = (req, res, next) => {
    const loginToken = req.cookies.loginToken;
    if (!loginToken) {
        return res.status(401).json("Authentication failed: no token found");
    }

    try {
        const decryptedToken = cryptr.decrypt(loginToken);
        const user = JSON.parse(decryptedToken);
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json("Authentication failed: invalid token");
    }
};



module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyAdmin,
    validateToken,
};

