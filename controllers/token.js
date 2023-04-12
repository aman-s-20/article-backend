const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
dotenv.config();



const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token)

    if (token == null) {
        return response.status(401).json({ statusCode:401,msg: 'token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return response.status(403).json({statusCode:401, msg: 'invalid token' })
        } 
        request.user = user;
        next();
    })
}

module.exports = {authenticateToken}