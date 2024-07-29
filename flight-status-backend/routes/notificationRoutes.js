const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const sendNotification = require('../utils/sendNotification');
const axios = require('axios');

// Define getFlightDetails function
const getFlightDetails = async (flightId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/flights/${flightId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching flight details:', error);
        throw error;
    }
};

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

        // Optionally send the notification
        const flight = await getFlightDetails(flight_id); // Fetch flight details
        await sendNotification(newNotification, flight);

        res.status(200).json({ message: 'Notification added successfully' });
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
