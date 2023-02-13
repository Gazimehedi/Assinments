const express = require('express');
const router = express.Router();
const AuthController  = require('../Controllers/AuthController');
router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);
router.post('/logout', AuthController.Logout);
module.exports = router;