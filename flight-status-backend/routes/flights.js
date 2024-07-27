// routes/flights.js
const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const Notification = require('../models/Notification');
const sendNotification = require('../utils/sendNotification'); // Utility function to send notifications

// Route to update flight status and notify users
router.put('/update-flight/:id', async (req, res) => {
    const { id } = req.params;
    const { status, departure_gate, arrival_gate, scheduled_departure, scheduled_arrival, actual_departure, actual_arrival } = req.body;

    try {
        // Update flight status
        const flight = await Flight.findByIdAndUpdate(id, {
            status,
            departure_gate,
            arrival_gate,
            scheduled_departure,
            scheduled_arrival,
            actual_departure,
            actual_arrival
        }, { new: true });

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        // Fetch users subscribed to this flight
        const notifications = await Notification.find({ flight_id: flight.flight_id });

        // Notify each user
        for (const notification of notifications) {
            await sendNotification(notification, flight);
        }

        res.status(200).json({ message: 'Flight updated and notifications sent', flight });
    } catch (error) {
        console.error('Error updating flight and sending notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
