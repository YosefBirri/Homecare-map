// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Create an Express application
const app = express();

// -----------------------
// Enable CORS for all origins
// -----------------------
app.use(cors()); // During development, allows requests from anywhere

// -----------------------
// Parse incoming requests
// -----------------------
app.use(express.json());                 // JSON body
app.use(express.urlencoded({ extended: true })); // URL-encoded forms

// -----------------------
// Import routes
// -----------------------
const indexRoute = require('./routes/index');            // your /api test route
const productRoutes = require('./routes/product.routes'); // housing, jobs, records

// -----------------------
// Mount routes
// -----------------------
app.use('/', indexRoute);           // GET /api test
app.use('/api', productRoutes);    // All /api/* routes for housing/jobs

// -----------------------
// Serve static files (optional frontend folder)
// -----------------------
app.use(express.static(path.join(__dirname, 'docs'))); // or 'public' if you rename folder

// -----------------------
// Start server (for local dev; Heroku uses Procfile)
// -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
