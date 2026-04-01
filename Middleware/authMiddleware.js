const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({
            message: "you are not logged in"
        })
    }

    const decodedData = jwt.verify(token, process.env.JWT_USER_PASSWORD)

    if (decodedData) {
        const userId = decodedData.id;
        req.userId = userId;
        return next();
    }
    return res.status(403).json({
        message: "malformed token"
    })
}

module.exports = {
    userMiddleware
}
