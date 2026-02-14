// Import the required module
const router = require('express-promise-router')();

// Import the productController module
const productController = require('../controllers/product.controller');

// Define routes for the functionalities
router.get('/get-record', productController.getRecord);
router.post('/add-record', productController.addRecord);
router.get('/approve-record/:id', productController.approveRecord);

// Housing routes
router.get('/get-housings', productController.getHousings);
router.post('/add-housing', productController.addHousing);

// Job routes
router.get('/get-jobs', productController.getJobs);           // Get approved jobs
router.post('/add-job', productController.addJob);           // Add a new job

// Export the router module
module.exports = router;
