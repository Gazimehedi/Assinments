const express = require('express');
const Auth = require('../Middleware/Auth');
const router = express.Router();
const TodoController = require('../Controllers/TodoController');

router.post('/create-todo', Auth, TodoController.CreateTodo);
router.get('/todos', Auth, TodoController.GetTodos);
router.post('/update-todo/:id', Auth, TodoController.UpdateTodo);
router.post('/update-todo-status/:id', Auth, TodoController.UpdateTodoStatus);
router.delete('/delete-todo/:id', Auth, TodoController.DeleteTodo);
router.get('/get-todo-by-status', Auth, TodoController.GetTodosByStatus);
router.get('/get-todo-by-date', Auth, TodoController.GetTodosByDate);

module.exports = router;