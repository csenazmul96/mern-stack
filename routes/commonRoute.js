const express = require('express');
const {uploadLogo} = require("../controllers/SettingController");
const {upload, processAndStoreImage} = require("../utils/Helper");

const router = express.Router();


router.post('/upload-logo',upload.single('logo'), processAndStoreImage, uploadLogo);

module.exports = router;