const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Allow requests from anywhere (for testing)
app.use(cors());

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
const indexRoute = require('./routes/index');
const productRoutes = require('./routes/product.routes');

app.use('/', indexRoute);
app.use('/api', productRoutes);

// 🔴 IMPORTANT: serve frontend from ROOT project folder
// This assumes index.html is in the main repo folder
app.use(express.static(path.join(__dirname, '..')));

// Fallback so refreshing the page still works
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

module.exports = app;
