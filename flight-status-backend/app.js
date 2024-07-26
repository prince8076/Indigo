const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api', routes);

module.exports = app;
