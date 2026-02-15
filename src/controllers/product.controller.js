const db = require("../config/database");


// ======================
// RECORDS
// ======================

exports.getRecord = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM "tblRecord" ORDER BY id ASC');
        res.status(200).json(response.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching records" });
    }
};

exports.addRecord = async (req, res) => {
    const { contributor, content, lat, lng } = req.body;

    if (!contributor || !content || lat == null || lng == null) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await db.query(
            'INSERT INTO "tblRecord"(contributor, content, lat, lng) VALUES ($1, $2, $3, $4) RETURNING *',
            [contributor, content, Number(lat), Number(lng)]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error adding record" });
    }
};


// ======================
// HOUSING
// ======================

exports.addHousing = async (req, res) => {
    const { contributor, title, description, lat, lng, price } = req.body;

    console.log("Incoming housing payload:", req.body);

    try {
        const result = await db.query(
            `INSERT INTO "tblHousing"
             (contributor, title, description, lat, lng, price, created_at)
             VALUES ($1,$2,$3,$4,$5,$6,NOW())
             RETURNING *`,
            [contributor, title, description, lat, lng, price]
        );

        res.json(result.rows[0]);

    } catch (err) {
        console.error("DB ERROR:", err);   // ← THIS is what we need
        res.status(500).json({
            message: "DB insert failed",
            error: err.message,
            detail: err.detail
        });
    }
};



// ======================
// JOBS
// ======================

exports.getJobs = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM "tblJobs" ORDER BY created_at DESC'
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching jobs" });
    }
};

exports.addJob = async (req, res) => {
    let { contributor, title, description, lat, lng, expected_pay, hours } = req.body;

    if (!title || lat == null || lng == null) {
        return res.status(400).json({ error: "Missing required job fields" });
    }

    contributor = contributor || "Anonymous";
    description = description || "";
    expected_pay = expected_pay ? Number(expected_pay) : null;
    hours = hours || null;

    try {
        const result = await db.query(
            `INSERT INTO "tblJobs"
             (contributor, title, description, lat, lng, expected_pay, hours, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
             RETURNING *`,
            [
                contributor,
                title,
                description,
                Number(lat),
                Number(lng),
                expected_pay,
                hours
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error adding job" });
    }
};
