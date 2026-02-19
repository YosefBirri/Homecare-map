const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();

// Enable all CORS for the application
app.use(cors());

// parse regular JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the userRoute for API routes starting with '/api/'
const userRoute = require('./routes/product.routes');
app.use('/api', userRoute);

app.use('/img', express.static('img'));

app.use(express.static('docs'));

// Routes
const index = require('./routes/index');
app.use('/', index);

module.exports = app;
