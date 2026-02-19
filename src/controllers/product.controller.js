const db = require("../config/database");

// HOUSING
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
    const contributorSafe = req.body.contributor || "Anonymous";
    const { title, description, lat, lng, price } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO "tblHousing"
            (contributor,title,description,lat,lng,price,created_at)
            VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING *`,
            [contributorSafe, title, description, lat, lng, price]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding housing post");
    }
};

// JOBS
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

    console.log("Incoming job payload:", req.body);

    // required fields
    if (!title) {
        return res.status(400).json({ error: "Title required" });
    }

    try {
        const result = await db.query(
            `INSERT INTO "tblJobs"
            (contributor, title, description, lat, lng, expected_pay, hours, created_at)
            VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
            RETURNING *`,
            [
                contributor || "Anonymous",
                title,
                description || "",
                parseFloat(lat),
                parseFloat(lng),
                expected_pay || 0,
                hours || 0
            ]
        );

        res.status(200).json(result.rows[0]);

    } catch (err) {
        console.error("JOB INSERT ERROR:", err);

        res.status(500).json({
            error: "Database insert failed",
            detail: err.message
        });
    }
};

module.exports = {
    getHousings,
    addHousing,
    getJobs,
    addJob
};
