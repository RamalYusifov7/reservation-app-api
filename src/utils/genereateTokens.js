const jwt = require("jsonwebtoken")

const generateAccessToken = (user) => {
    const token = jwt.sign({ id: user?.id, isAdmin: user?.isAdmin }, process.env.ACCESS_TOKEN, {
        expiresIn: "60s"
    })
    return token
}

// const generateRefreshToken = (user) => {
//     const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN, {
//         expiresIn: "1d"
//     })
//     return token
// }
module.exports = {
    generateAccessToken,
    // generateRefreshToken
}