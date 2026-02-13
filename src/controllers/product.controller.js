const db = require("../config/database");

const {Parser} = require('json2csv');
const json2csvParser = new Parser();


// /**
//  * getRecords: Obtains all records
//  */
// getRecords: Obtains all records
exports.getRecord = async(req, res) => {//
    const response = await db.query('SELECT * FROM "tblRecord" WHERE approved = true ORDER BY id ASC');//
    const json = JSON.stringify(response);
    res.status(200).send(json);//
};//



// /**
//  * Insert Comment/Review: Inserts user insert data of review into tblReview in the database
//  * @param {form} req - form body that contains user selected information
//  * @param {status} res - confirmation that comment has been added into the review table
//  */
exports.addRecord = async(req, res) => {
    let {contributor, content, lat, lng} = req.body;
    // let currTime = new Date().toISOString();
    console.log('INSERT INTO "tblRecord"(contributor, content, lat, lng) VALUES ($1, $2, $3, $4)',
        [contributor, content, lat, lng]);
    let {recordRows} = await db.query(
        'INSERT INTO "tblRecord"(contributor, content, lat, lng) VALUES ($1, $2, $3, $4)',
        [contributor, content, lat, lng]
    )

    res.status(200).send({
        message: "record added into record table!",
        body: {
            record: {contributor, content, lat, lng}
        }
    })
};

exports.approveRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            'UPDATE "tblRecord" SET approved = true WHERE id = $1 RETURNING *',
            [id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error approving record");
    }
};


// Get approved housing posts
exports.getHousings = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM "tblHousing" WHERE approved = true ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching housing posts");
    }
};

// Add new housing post
exports.addHousing = async (req, res) => {
    const { contributor, title, description, lat, long, price } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO "tblHousing" (contributor, title, description, lat, lng, price)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [contributor, title, description, lat, long, price]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding housing post");
    }
};

// Approve housing post
exports.approveHousing = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            'UPDATE "tblHousing" SET approved = true WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error approving housing post");
    }
};

// Get approved jobs
exports.getJobs = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM "tblJobs" WHERE approved = true ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching jobs");
    }
};

// Add new job
exports.addJob = async (req, res) => {
    const { contributor, title, description, lat, lng, expected_pay, hours } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO "tblJobs" (contributor, title, description, lat, lng, expected_pay, hours)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [contributor, title, description, lat, lng, expected_pay, hours]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding job");
    }
};

// Approve job
exports.approveJob = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            'UPDATE "tblJobs" SET approved = true WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error approving job");
    }
};



