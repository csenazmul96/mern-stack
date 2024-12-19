const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Export User Model
const User = mongoose.model('Setting', SettingsSchema);

module.exports = User;
