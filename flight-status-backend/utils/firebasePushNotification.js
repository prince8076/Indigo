// utils/sendNotification.js
const admin = require('../firebase'); // Adjust path as needed

const sendNotification = async (registrationToken, messageData) => {
    const message = {
        data: messageData,
        token: registrationToken,
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

module.exports = sendNotification;
