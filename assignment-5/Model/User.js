const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ],
    },
    Password: {
        type: String,
        required: true,
        minLength: 6
    },
    Mobile: {
        type: String
    },
    City: {
        type: String
    }
},{
    timestamps: true,
    versionKey:false
});
userSchema.pre("save", async function(next){
    if(!this.isModified("Password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.Password, salt);
    this.Password = hashed;
    next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;