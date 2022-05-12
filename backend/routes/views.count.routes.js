const express = require("express");
const router = new express.Router();
const { view_ads, addviews, countview } = require("../controllers/views_controller")

router.post('/api/addviews', addviews)
router.get('/api/views/ads', view_ads)
router.get('/api/countview/:id', countview)

module.exports = router