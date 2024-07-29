const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure to adjust the path to your User model

// Route to subscribe a user
router.post('/', async (req, res) => {
    try {
        const { email, phone, preferredMethods } = req.body;

        // Validate that all required fields are provided
        if (!email || !phone || !preferredMethods) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new User instance and save it to the database
        const newUser = new User({ email, phone, preferredMethods });
        await newUser.save();

        // Respond with a success message
        res.status(200).json({ message: 'Subscribed successfully' });
    } catch (error) {
        // Log the error and respond with an internal server error message
        console.error('Error subscribing user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all subscribed users
router.get('/', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Respond with the list of users
        res.status(200).json(users);
    } catch (error) {
        // Log the error and respond with an internal server error message
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
