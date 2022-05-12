const express = require('express');
const { advertise } = require("../models/advertises");
const { views } = require("../models/views");
const app = express();
var ObjectId = require('mongoose').Types.ObjectId;


const limited_ads = async(req, res) => {
    try {
        advertise.aggregate([{
                $lookup: {
                    from: "views",
                    localField: "_id",
                    foreignField: "ad_Id",
                    as: "count_views",
                },
            }, {
                $unwind: "$count_views",
            }]).then(async(result) => {
                //console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        let { page, size } = req.query;
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 2
        }

        const limit = parseInt(size)
        const skip = (page - 1) * size; //iska matlab ye k jab user page 1 may hoga tw ek bhi ad skip nhi hoga jab page 2 may hoga tab 2 ads skip hogay jab page 3 may hoga tw 4 ads skip hogay and so on
        const ads_id = await advertise.find({}, '_id')
        var countobj = {}

        console.log(countobj)
            //const views_count = await views.count({ ad_Id: ads_id })
            //onsole.log(views_count)
        const adslimit = await advertise.find().limit(limit).skip(skip);
        const adsids = await advertise.find({}, '_id').limit(limit).skip(skip);
        //console.log(adsids);
        var lst1 = []
        for (i in adslimit) {
            var query = await views.count({ ad_Id: ads_id[i] });
            lst1.push(query)
            const views_count = await views.count({ ad_Id: adsids[i] })
                //console.log(views_count);
                //console.log(query);
            i.total_views = views_count

        }
        console.log(lst1)
        const adslimitcount = await advertise.count()
        res.status(200).send({ page, size, count: adslimitcount, data: adslimit })

    } catch (e) {
        console.log(e)
        return res.status(400).send(e)
    }
}

module.exports = { limited_ads }