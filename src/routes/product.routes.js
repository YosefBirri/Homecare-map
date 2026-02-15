const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

// -----------------------
// Record routes
// -----------------------
router.get('/get-record', productController.getRecord);
router.post('/add-record', productController.addRecord);

// -----------------------
// Housing routes
// -----------------------
router.get('/get-housings', productController.getHousings);
router.post('/add-housing', productController.addHousing);

// -----------------------
// Job routes
// -----------------------
router.get('/get-jobs', productController.getJobs);
router.post('/add-job', productController.addJob);

module.exports = router;
