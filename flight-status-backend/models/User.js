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
    },
    registrationToken: {
        type: String,
        required: true
    }
});

UserSchema.statics.getRegistrationToken = async function (userId) {
    const user = await this.findById(userId);
    return user ? user.registrationToken : null;
};

module.exports = mongoose.model('User', UserSchema);
