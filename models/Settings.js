const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: false,
    },
    intro:{
        type: String,
        required: false,
    }
}, { timestamps: true });

const Setting = mongoose.model('Setting', SettingsSchema);

module.exports = Setting;
