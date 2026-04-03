const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "you are not logged in"
        });
    }

    const token = authHeader.split(" ")[1];

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
