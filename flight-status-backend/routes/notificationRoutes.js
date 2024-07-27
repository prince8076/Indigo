// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); // Adjust path as needed

// Route to save the notification
router.post('/', async (req, res) => {
    try {
        const { flight_id, method, recipient, timestamp, token } = req.body;
        if (!flight_id || !method || !recipient || !timestamp) {
            return res.status(400).json({ error: 'All fields except token are required' });
        }

        // Save the notification to the database
        const newNotification = new Notification({ flight_id, method, recipient, timestamp, token });
        await newNotification.save();

        res.status(200).json({ message: 'Notification added successfully' });
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
