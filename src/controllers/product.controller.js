const db = require("../config/database");

// =======================
// RECORDS
// =======================
const getRecord = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM "tblRecord" ORDER BY id ASC');
        res.status(200).json(response.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching records");
    }
};

const addRecord = async (req, res) => {
    const { contributor, content, lat, lng } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO "tblRecord"(contributor, content, lat, lng) VALUES ($1,$2,$3,$4) RETURNING *',
            [contributor, content, lat, lng]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
};

// =======================
// HOUSING
// =======================
const getHousings = async (req, res) => {
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

const addHousing = async (req, res) => {
    const { contributor, title, description, lat, lng, price } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO "tblHousing"
            (contributor,title,description,lat,lng,price,created_at)
            VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING *`,
            [contributor, title, description, lat, lng, price]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding housing post");
    }
};

// =======================
// JOBS
// =======================
const getJobs = async (req, res) => {
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

const addJob = async (req, res) => {
    const { contributor, title, description, lat, lng, expected_pay, hours } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO "tblJobs"
            (contributor,title,description,lat,lng,expected_pay,hours,created_at)
            VALUES ($1,$2,$3,$4,$5,$6,$7,NOW()) RETURNING *`,
            [contributor, title, description, lat, lng, expected_pay, hours]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding job");
    }
};

module.exports = {
    getRecord,
    addRecord,
    getHousings,
    addHousing,
    getJobs,
    addJob
};
