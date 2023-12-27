// Middleware for handling auth
const jwt = require("jsonwebtoken")
const secretKey = "secret"
function adminMiddleware(req, res, next) {
     const token = req.headers.authorization.split(' ')[1]
     try{
          jwt.verify(token,secretKey)
          next()
     }
     catch(error){
         res.status(404).json({msg: error})
     }
     
}

module.exports = adminMiddleware;