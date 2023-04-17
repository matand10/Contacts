const jwt = require("jsonwebtoken");
const dbService = require('../services/db.service')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.status(401).json("You are not authenticated!");
//   }
// }

const verifyToken = (req) => {
  const json = cryptr.decrypt(req.cookies.loginToken)
  return JSON.parse(json)
};

function validateToken(req, res, next) {
  const json = cryptr.decrypt(req.cookies.loginToken)
  const loggedinUser = JSON.parse(json)
  if (loggedinUser) return next()
  return res.status(401).json("You are not authenticated!");
}


const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  const currUser = verifyToken(req)
  if (currUser.isAdmin) next()
  else res.status(403).json("You are not alowed to do that!")
};

// const verifyTokenAndAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not alowed to do that!");
//     }
//   });
// };

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

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyAdmin,
  validateToken,
};
