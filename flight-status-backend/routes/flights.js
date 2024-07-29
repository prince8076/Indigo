const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');
const Notification = require('../models/Notification');
const sendNotification = require('../utils/sendNotification');

// Route to update flight status and notify users
router.put('/update-flight/:id', async (req, res) => {
    const { id } = req.params;
    const { status, departure_gate, arrival_gate, scheduled_departure, scheduled_arrival, actual_departure, actual_arrival } = req.body;

    try {
        // Validate required fields
        if (!status || !departure_gate || !arrival_gate || !scheduled_departure || !scheduled_arrival || !actual_departure || !actual_arrival) {
            return res.status(400).json({ message: 'All fields are required' });
        }

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
        const notificationPromises = notifications.map(notification =>
            sendNotification(notification, flight).catch(error => {
                console.error(`Error sending notification to ${notification.recipient}:`, error);
            })
        );
        await Promise.all(notificationPromises);

        res.status(200).json({ message: 'Flight updated and notifications sent', flight });
    } catch (error) {
        console.error('Error updating flight and sending notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
