// const { consumer } = require('../config/kafka');

// consumer.on('message', async (message) => {
//     const update = JSON.parse(message.value);
//     console.log('Received update:', update);

//     // Logic to send notifications (e.g., via SMS, email)
//     // For example:
//     // await sendEmailNotification(update);
//     // await sendSMSNotification(update);
// });

// const sendEmailNotification = async (update) => {
//     // Email notification logic
// };

// const sendSMSNotification = async (update) => {
//     // SMS notification logic
// };

// module.exports = { sendEmailNotification, sendSMSNotification };



const { producer } = require('../config/kafka');

exports.subscribe = async ({ email, sms }) => {
    // Save subscription to the database or an in-memory store
};

exports.sendNotification = (update) => {
    const payloads = [
        { topic: 'flight-updates', messages: JSON.stringify(update) },
    ];
    producer.send(payloads, (err, data) => {
        if (err) console.error(err);
        console.log('Notification sent:', data);
    });
};
