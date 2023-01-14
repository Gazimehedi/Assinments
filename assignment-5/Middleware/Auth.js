const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');

const Auth = asyncHandler( async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401);
            throw new Error('Not authorized, please login');
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id).select("-Password");
        if(!user){
            res.status(401);
            throw new Error('Invalid User Information');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500);
        throw new Error('Not Authorized, Please login');
    }
});
module.exports=Auth;