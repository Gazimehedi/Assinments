const Todo = require('../Model/Todo');
const asyncHandler = require('express-async-handler');
exports.CreateTodo = asyncHandler( async (req,res) => {
    const {Subject,Description} = req.body;
    if(!Subject && !Description){
        res.status(400);
        throw new Error('Please fil in all required fileds');
    }
    const todo = await Todo.create({
        User: req.user._id,
        Subject,
        Description,
        Status: "new"
    });
    res.status(201).json(todo);
});
exports.GetTodos = asyncHandler( async (req,res) => {
    const todos = await Todo.find({user: req.user._id});
    res.status(201).json(todos);
});
exports.UpdateTodo = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const user = req.user._id;
    const {Subject,Description} = req.body;
    if(!Subject && !Description){
        res.status(400);
        throw new Error('Please fill in all required fileds');
    }
    const todo = await Todo.findOne({_id:id,user});
    if(!todo){
        res.status(400);
        throw new Error('You cannot update this todo');
    }
    const udpateTodo = await Todo.findByIdAndUpdate(
        {_id:id},
        {$set: {Subject,Description}},
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json(udpateTodo);
});
exports.UpdateTodoStatus = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const user = req.user._id;
    const {Status} = req.body;
    const todo = await Todo.findOne({_id:id,user});
    if(!todo){
        res.status(400);
        throw new Error('You cannot update this todo');
    }
    const udpateTodo = await Todo.updateOne(
        {_id:id},
        {$set: {Status}},
        {upsert: true}
    );
    res.status(200).json({message:"todo status updated successfully"});
});
exports.DeleteTodo = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const user = req.user._id;
    const todo = await Todo.findOne({_id:id,user});
    if(!todo){
        res.status(400);
        throw new Error('You cannot update this todo');
    }
    const udpateTodo = await Todo.remove({_id:id});
    res.status(200).json({message: "Todo deleted successfully"});
});
exports.GetTodosByStatus = asyncHandler( async (req,res) => {
    const {Status} = req.query;
    const User = req.user._id;
    const todo = await Todo.find({User,Status});
    res.status(200).json(todo);
});
exports.GetTodosByDate = asyncHandler( async (req,res) => {
    const {fromDate,toDate} = req.query;
    const User = req.user._id;
    const todos = await Todo.find({User, createdAt: {$gte: new Date(fromDate), $lte: new Date(toDate)}});
    res.status(200).json(todos);
});