const User = require('../Model/User');
const asyncHandler = require('express-async-handler');
exports.GetUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id).select("-Password");
    res.status(200).json(user);
});
exports.UpdateUser = asyncHandler(async (req,res) => {
    const {FirstName,LastName,Username,Email,Mobile,City} = req.body;
    if(!FirstName && !LastName && !Email && !Mobile && !City) {
        res.status(400);
        throw new Error('Please fill in all requires fields');
    }
    const updateData = await User.findByIdAndUpdate(
        {_id: req.user._id},
        {$set: {FirstName,LastName,Email,Mobile,City}},
        {new: true,runValidators: true}
    );
    res.status(200).json({
        id: updateData._id,
        FirstName: updateData.FirstName,
        LastName: updateData.LastName,
        Username: updateData.Username,
        Email: updateData.Email,
        Mobile: updateData.Mobile,
        City: updateData.City
    });
});