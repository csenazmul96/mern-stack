const express = require('express');
const {uploadLogo} = require("../controllers/SettingController");
const {upload} = require("../utils/Helper");

const router = express.Router();


router.post('/upload-logo',upload.single('logo'), uploadLogo);

module.exports = router;