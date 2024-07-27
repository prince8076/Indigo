// routes/sendNotification.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); // Adjust path as needed
const Flight = require('../models/Flight'); // Adjust path as needed to fetch flight details
const sendNotification = require('../utils/sendNotification'); // Adjust path as needed

// Route to send notifications
router.post('/send', async (req, res) => {
    try {
        const { notification_id } = req.body;
        if (!notification_id) {
            return res.status(400).json({ error: 'Notification ID is required' });
        }

        // Fetch the notification from the database
        const notification = await Notification.findById(notification_id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        // Fetch the flight details
        const flight = await Flight.findById(notification.flight_id);
        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        // Send the notification
        await sendNotification(notification, flight);

        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
