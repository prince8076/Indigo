const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'konikasingh349@gmail.com',
        pass: 'jvcwfuiqgctkripj'
    }
});

const smsGateways = {
    'verizon': 'vtext.com',
    'att': 'txt.att.net',
    'tmobile': 'tmomail.net',
    'sprint': 'messaging.sprintpcs.com'
};

const sendNotification = async (notification, flight) => {
    const { method, recipient, carrier } = notification;
    const message = `Flight Update: Your flight ${flight.flight_id} is ${flight.status}. Departure gate: ${flight.departure_gate}, Arrival gate: ${flight.arrival_gate}. Scheduled Departure: ${flight.scheduled_departure}, Scheduled Arrival: ${flight.scheduled_arrival}.`;

    try {
        if (method === 'Email') {
            const mailOptions = {
                from: 'konikasingh349@gmail.com',
                to: recipient,
                subject: 'Flight Status Update',
                text: message
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent to:', recipient);
        } else if (method === 'SMS' && carrier && smsGateways[carrier]) {
            const smsRecipient = `${recipient}@${smsGateways[carrier]}`;
            const mailOptions = {
                from: '9773823909',  // Change to a verified sender email if needed
                to: smsRecipient,
                subject: '',
                text: message
            };

            await transporter.sendMail(mailOptions);
            console.log('SMS sent to:', recipient);
        } else {
            console.error('Unsupported notification method or missing carrier information');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = sendNotification;
