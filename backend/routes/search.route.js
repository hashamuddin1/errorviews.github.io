const express = require("express");
const router = new express.Router();
const { search } = require("../controllers/search_controller")

router.get('/api/search/:title', search)

module.exports = router