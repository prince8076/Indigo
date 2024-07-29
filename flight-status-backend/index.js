const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Adjust path as needed
const flightRoutes = require('./routes/CURD_Operation'); // Adjust path as needed
const cors = require('cors');
const notificationRoutes = require('./routes/notificationRoutes');
const sendNotification = require('./utils/sendNotification');
const SubscribeNotification = require('./routes/subscriptionRoutes');
const flights = require('./routes/flights');





const app = express();

connectDB();

app.use(express.json());
app.use(cors());

// Use flight routes
app.use('/api', flightRoutes);
app.use('/api/notifications', notificationRoutes); // New
app.use('/api/notifications/send', sendNotification);
app.use('/api/subscription', SubscribeNotification);
app.use('/api/flights', flights);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
