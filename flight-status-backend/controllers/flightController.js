const Flight = require('../models/flight');

exports.getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error.message);
        res.status(500).send('Server Error');
    }
};

exports.getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findOne({ flight_id: req.params.id });
        if (!flight) return res.status(404).send('Flight not found');
        res.json(flight);
    } catch (error) {
        console.error('Error fetching flight:', error.message);
        res.status(500).send('Server Error');
    }
};

exports.addFlight = async (req, res) => {
    const { flight_id, airline, status, departure_gate, arrival_gate, scheduled_departure, scheduled_arrival, actual_departure, actual_arrival } = req.body;

    try {
        const newFlight = new Flight({
            flight_id,
            airline,
            status,
            departure_gate,
            arrival_gate,
            scheduled_departure,
            scheduled_arrival,
            actual_departure,
            actual_arrival
        });
        await newFlight.save();
        res.status(201).json(newFlight);
    } catch (error) {
        console.error('Error adding flight:', error.message);
        res.status(500).send('Server Error');
    }
};

exports.updateFlight = async (req, res) => {
    try {
        const flight = await Flight.findOneAndUpdate(
            { flight_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!flight) return res.status(404).send('Flight not found');
        res.json(flight);
    } catch (error) {
        console.error('Error updating flight:', error.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteFlight = async (req, res) => {
    try {
        const flight = await Flight.findOneAndDelete({ flight_id: req.params.id });
        if (!flight) return res.status(404).send('Flight not found');
        res.json({ msg: 'Flight removed' });
    } catch (error) {
        console.error('Error deleting flight:', error.message);
        res.status(500).send('Server Error');
    }
};
