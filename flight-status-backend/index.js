const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Adjust path as needed
const flightRoutes = require('./routes/index'); // Adjust path as needed
const cors = require('cors');
const notificationRoutes = require('./routes/notificationRoutes');
const sendNotification = require('./utils/sendNotification');




const app = express();

connectDB();

app.use(express.json());
app.use(cors());

// Use flight routes
app.use('/api', flightRoutes);
app.use('/api/notifications', notificationRoutes); // New
app.use('/api/notifications/send', sendNotification);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
