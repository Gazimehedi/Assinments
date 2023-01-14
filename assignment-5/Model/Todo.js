const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        Subject: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true
        },
        Status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;