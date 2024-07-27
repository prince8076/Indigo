// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path as needed

// Route to subscribe a user
router.post('/subscribe', async (req, res) => {
    try {
        const { email, phone, preferredMethods } = req.body;

        if (!email || !phone || !preferredMethods) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newUser = new User({ email, phone, preferredMethods });
        await newUser.save();

        res.status(200).json({ message: 'Subscribed successfully' });
    } catch (error) {
        console.error('Error subscribing user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all subscribed users
router.get('/subscribers', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
