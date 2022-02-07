var jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "Ammyiscoolhacker$";

const fetchUser = (req, res, next) => {
    //Get the user from the jwt token and add id to the req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate with valid User-Token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.userData = data.userData;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate with valid User-Token" });
    }
}

module.exports = fetchUser
