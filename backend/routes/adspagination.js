const express = require("express");
const adv_router = new express.Router();
const app = express();

const { limited_ads } = require("../controllers/adspagination_controller")

//GET limited ADVERTISE
adv_router.get("/api/limited_ads", limited_ads)

module.exports = adv_router