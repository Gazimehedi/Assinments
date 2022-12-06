const express = require('express');
const router = express.Router();
const { UpdatekUser, UploadImage, fileDownload } = require('../controllers/MainController');
const auth = require('../middlewares/auth');
const userValidation = require('../validations');

router.post('/update-user', auth, userValidation, UpdatekUser);
router.post('/upload-image', UploadImage);
router.get('/file-download', fileDownload);

module.exports = router;