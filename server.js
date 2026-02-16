// Load environment variables (important for Heroku + local dev)
require('dotenv').config();

// Import the Express app
const app = require('./src/app');

// Use the Heroku-assigned port, fallback for local dev
const PORT = process.env.PORT || 5001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
