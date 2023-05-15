const jwt = require('jsonwebtoken')
const JWT_KEY = 'sdfasdfsadfsdaf'
function protectRoutes(req, res, next) {
    if (req.cookies.isLoggedIn) {
        let isVerified = jwt.verify(req.cookies.isLoggedIn, JWT_KEY)
        if (isVerified) {
            next();
        }
        else {
            return res.json({
                message: "User Not Verified"
            })
        }
        // next();
    }
    else {
        return res.json({
            message: "Operation Not Allowed"
        })
    }
}
module.exports = protectRoutes