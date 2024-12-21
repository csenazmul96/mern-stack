const express = require('express');
const {uploadLogo} = require("../controllers/SettingController");
const {upload, processAndStoreImage} = require("../utils/Helper");
const {userLogin} = require("../controllers/userController");

const router = express.Router();

router.post('/upload-logo',upload.single('logo'), processAndStoreImage, uploadLogo);
router.post('/login', userLogin);

module.exports = router;