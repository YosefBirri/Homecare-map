// Load environment variables for local dev and heroku dev
require('dotenv').config();

// Import the 'app' module from the './src/app' file
const app = require('./src/app');

// Set the port for the server to listen on, defaulting to 3000 if not provided
const PORT = process.env.PORT || 3000;

// Start server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
