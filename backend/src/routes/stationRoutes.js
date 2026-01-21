const express = require('express');
const { getAllStations, createStation } = require('../controllers/stationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllStations); // Public or Authenticated? Let's make it open or at least basic auth. Open is fine for dropdowns.
router.post('/', authMiddleware, createStation); // Protected + Admin Check inside controller

module.exports = router;
