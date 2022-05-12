const express = require('express');
const { advertise } = require("../models/advertises");
const app = express();

const search = async(req, res) => {
    try {
        var regexp = new RegExp("^" + req.params.title, "i");
        const resultsearch = await advertise.find({ title: regexp })
        console.log(resultsearch)
        res.status(200).send(resultsearch)
    } catch (e) {
        console.log(e)
    }
}
module.exports = { search }