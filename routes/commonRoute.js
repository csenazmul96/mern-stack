const express = require('express');
const {uploadLogo} = require("../controllers/SettingController");

const router = express.Router();


router.post('/upload-logo', uploadLogo);

module.exports = router;