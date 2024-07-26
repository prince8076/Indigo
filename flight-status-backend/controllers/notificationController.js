// controllers/notificationController.js
const { notifications } = require('../mockData');

exports.subscribe = async (req, res) => {
    const { email, sms } = req.body;
    // Simulate subscription
    res.json({ message: 'Subscribed successfully' });
};

exports.getNotifications = async (req, res) => {
    res.json(notifications);
};
