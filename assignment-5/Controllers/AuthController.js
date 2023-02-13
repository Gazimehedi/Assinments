const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: "7d"});
}
exports.Register = asyncHandler( async (req, res) => {
    const {FirstName,LastName,Username,Email,Password,Mobile,City} = req.body;
    if(!FirstName && !LastName && !Username&& !Email&& !Password && !Mobile && !City) {
        res.status(400);
        throw new Error('Please fill in all requires fields');
    }
    if(Password.length < 6){
        res.status(400);
        throw new Error('Password must be up to 6 characters');
    }

    const userExists = await User.findOne({Email});
    if(userExists){
        res.status(400);
        throw new Error('Email has already been registered');
    }
    const user = await User.create(req.body);
    if(user){
        res.status(201).json({
            status: 'success',
            message: 'User Registration successfully'
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});
exports.Login = asyncHandler(async (req,res) => {
    const {Email, Password} = req.body;
    if(!Email && !Password){
        res.status(400);
        throw new Error('Please fill in all requires fileds');
    }
    const user = await User.findOne({Email});
    if(!user){
        res.status(400);
        throw new Error('User not found please signup');
    }
    const checkPassword = await bcrypt.compare(Password, user.Password);
    const token = generateToken(user._id);
    //set cookie 
    res.cookie("token",token,{
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none"
    });
    if(user && checkPassword){
        const {_id,Username,Email,Mobile,City} = user;
        res.status(200).json({
            id:_id,
            Username,
            Email,
            Mobile,
            City,
            token
        });
    }else{
        res.status(400);
        throw new Error('Invalid Email & Password');
    }
});
exports.Logout = asyncHandler(async (req,res) => {
    res.cookie("token","",{
        path:'/',
        httpOnly:true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true
    });
    res.status(200).json({message:'User logout successfully'});
});