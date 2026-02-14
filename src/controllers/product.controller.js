const db = require("../config/database");

// Get all records (tblRecord) - you can remove approved filter
exports.getRecord = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM "tblRecord" ORDER BY id ASC');
        res.status(200).json(response.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching records");
    }
};

// Add new record (tblRecord)
exports.addRecord = async (req, res) => {
    const { contributor, content, lat, lng } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO "tblRecord"(contributor, content, lat, lng) VALUES ($1, $2, $3, $4) RETURNING *',
            [contributor, content, lat, lng]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
};

// ===== HOUSING =====

// Get all housings
const db = require("../config/database");

// --------------------------
// GET ALL HOUSINGS
// --------------------------
exports.getHousings = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM "tblHousing" ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching housing posts");
    }
};

// --------------------------
// ADD NEW HOUSING
// --------------------------
exports.addHousing = async (req, res) => {
    const { contributor, title, description, lat, long, price } = req.body;

    // Ensure lng is used in DB
    const lng = long;

    try {
        const result = await db.query(
            `INSERT INTO "tblHousing" (contributor, title, description, lat, lng, price, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
            [contributor, title, description, lat, lng, price]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding housing post");
    }
};


// ===== JOBS =====

exports.getJobs = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM "tblJobs" ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching jobs");
    }
};

exports.addJob = async (req, res) => {
    const { contributor, title, description, lat, lng, expected_pay, hours } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO "tblJobs" (contributor, title, description, lat, lng, expected_pay, hours, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`,
            [contributor, title, description, lat, lng, expected_pay, hours]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding job");
    }
};
