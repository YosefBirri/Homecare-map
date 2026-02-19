// Import the required module
const router = require('express-promise-router')();

// Import the productController module
const productController = require('../controllers/product.controller.js');

// Housing routes
router.get('/get-housings', productController.getHousings);
router.post('/add-housing', productController.addHousing);

// Job routes
router.get('/get-jobs', productController.getJobs);
router.post('/add-job', productController.addJob);

module.exports = router;
