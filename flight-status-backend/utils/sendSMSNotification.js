// utils/sendSMSNotification.js
const twilio = require('twilio');
const accountSid = 'your_account_sid'; // Replace with your Twilio account SID
const authToken = 'your_auth_token'; // Replace with your Twilio auth token
const client = new twilio(accountSid, authToken);

const sendSMSNotification = async (phoneNumber, messageData) => {
    try {
        const message = await client.messages.create({
            body: messageData,
            to: phoneNumber,
            from: 'your_twilio_phone_number' // Replace with your Twilio phone number
        });
        console.log('Successfully sent SMS notification:', message.sid);
    } catch (error) {
        console.error('Error sending SMS notification:', error);
    }
};

module.exports = sendSMSNotification;
