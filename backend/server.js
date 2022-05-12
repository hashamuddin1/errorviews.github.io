const express = require('express');
require('./config/connectDb');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 3002
const user_router = require('./routes/user.route');
const adv_router = require('./routes/advertise.route');
var cors = require('cors');
const category_router = require('./routes/category.route');
const notification_router = require('./routes/notification.routes');
const adv_det_router = require('./routes/adsdetail.routes');
const pag_router = require('./routes/adspagination');
const search_router = require('./routes/search.route');
const views_count = require("./routes/views.count.routes")
const app = express();
var corsOptions = {
    origin: 'http://192.168.10.6:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(bodyparser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: false
}));

app.use(cors());
app.use(express.json());
app.use([user_router, views_count, search_router, pag_router, adv_det_router, adv_router, category_router, notification_router])

// connectDb()
app.listen(PORT, () => {
    console.log(`server is start ${PORT}`)
})