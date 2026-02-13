// Import the required module
const { Pool } = require('pg');

// Create a new instance of the Pool object with the database connection configuration
const pool = new Pool({
    host: 'c683rl2u9g20vq.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    user: 'ubiupiovi6ho30',
    password: 'pbe1a0160912ee8bea934c197e81244719b2fe8fcd148bdacd62b3b007d6e7b97',
    database: 'd3fqh79ef4ffg5',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

// Event listener for the 'connect' event, which is triggered when a new connection is established
pool.on('connect', () => {
    console.log("Database connection success - connected to Heroku database!");
});

// Export an object with a 'query' method that executes SQL queries using the connection pool
module.exports = {
    query: (text, params) => pool.query(text, params),
};
