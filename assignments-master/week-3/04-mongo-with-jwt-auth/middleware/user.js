const jwt = require("jsonwebtoken")
let secretKey = "secret"
function userMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    try{
         req.userInfo = jwt.verify(token,secretKey)
         next()
    }
    catch(error){
        res.status(404).json({msg: error})
    }
    
}

module.exports = userMiddleware;