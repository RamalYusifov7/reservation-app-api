const CustomError = require("./error");
const jwt = require("jsonwebtoken")
const verifyToken = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return next(new CustomError("token is not valid"))
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated")
    }
}
const isAuthorized = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(new CustomError("you are not authorized"))
        }
    })
}
const isAdmin = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return next(new CustomError("you are not authorized"))
        }
    })
}
module.exports = {
    verifyToken,
    isAuthorized,
    isAdmin
}