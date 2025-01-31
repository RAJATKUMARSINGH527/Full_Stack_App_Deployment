const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken  = async(req, res, next) => {
    try {
        //optional chaining for null check if headers.Authorization is not present then it will return undefined
        // Extract token from Authorization header
        const token = req.headers.authorization?.split(" ")[1]; 
        if(!token) {
            res.status(400).send({error: '"Unauthorized access! Token missing."'});
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log(decoded);

         // Attach decoded user info to the request object
        req.body.userId = decoded.userId;

        // Pass control to the next middleware
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token!", error: error.message });
    }
};

module.exports = { verifyToken };