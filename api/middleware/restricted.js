const jwt = require('jsonwebtoken')
const secrets = require('../config/secret');
module.exports = (req, res, next) => {
  const token = req.header('authorization');
  if(!token) {
    res.status(401).json({
      message: 'you are not authorized to view this page'
      })
    }
    jwt.verify(JSON.parse(token), secrets, (error, decodedToken) => {
      if(error) {
        res.status(401).json({
          message: 'token does not exist', error
        })
      }
      console.log('decoded token ->', decodedToken)
      req.decodedJWT = decodedToken
      next()
    })
};