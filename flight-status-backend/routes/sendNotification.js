const express = require('express');
const router = express.Router();
const sendPushNotification = require('../utils/sendPushNotification');
const sendSMSNotification = require('../utils/sendSMSNotification');
const sendEmailNotification = require('../utils/sendEmailNotification');
const User = require('../models/User'); // Adjust path as needed

router.post('/send-push', async (req, res) => {
    const { userId, messageData } = req.body;

    try {
        const registrationToken = await User.getRegistrationToken(userId);
        if (!registrationToken) {
            return res.status(404).json({ message: 'Registration token not found' });
        }

        await sendPushNotification(registrationToken, messageData);
        res.status(200).json({ message: 'Push notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send push notification' });
    }
});

router.post('/send-sms', async (req, res) => {
    const { phoneNumber, messageData } = req.body;

    try {
        await sendSMSNotification(phoneNumber, messageData);
        res.status(200).json({ message: 'SMS notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send SMS notification' });
    }
});

router.post('/send-email', async (req, res) => {
    const { email, subject, text } = req.body;

    try {
        await sendEmailNotification(email, subject, text);
        res.status(200).json({ message: 'Email notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email notification' });
    }
});

module.exports = router;
