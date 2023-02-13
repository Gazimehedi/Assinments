const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const Auth = require('../Middleware/Auth');

router.get('/user', Auth, UserController.GetUser);
router.post('/update-user', Auth, UserController.UpdateUser);

module.exports = router;