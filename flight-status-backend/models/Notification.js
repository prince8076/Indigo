
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    flight_id: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        enum: ['Email', 'SMS', 'App'],
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    token: {
        type: String, // Store the Firebase token here
        required: false,
    },
});

module.exports = mongoose.model('Notification', notificationSchema);
