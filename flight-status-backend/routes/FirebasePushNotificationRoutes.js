// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const sendNotification = require('../utils/firebasePushNotification');
const { getRegistrationToken } = require('../models/User'); // Adjust path as needed

router.post('/send', async (req, res) => {
    const { userId, messageData } = req.body;

    try {
        const registrationToken = await getRegistrationToken(userId);
        if (!registrationToken) {
            return res.status(404).json({ message: 'Registration token not found' });
        }

        await sendNotification(registrationToken, messageData);
        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

module.exports = router;
