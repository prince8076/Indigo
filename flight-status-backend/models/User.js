// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    preferredMethods: {
        type: [String],
        enum: ['SMS', 'Email', 'App'],
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
