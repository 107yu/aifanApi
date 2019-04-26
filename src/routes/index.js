var express = require('express');
var router = express.Router();
let Mongo = require("mongodb-curd");
let dbName = "4-22";
let cName = "aifan"
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/getdata', function(req, res, next) {
    let { type, limit, page } = req.body
    if (!type || !limit || !page) {
        return res.send({ code: 2, msg: "参数不完整" })
    }
    Mongo.find(dbName, cName, { type: type }, (len) => {
        if (len) {
            Mongo.find(dbName, cName, { type: type }, (rs) => {
                if (rs) {
                    res.send({ code: 1, data: rs, size: len.length })
                } else {
                    res.send({ code: 0, msg: "error" })
                }
            }, {
                limit: limit,
                skip: (page - 1) * limit
            })
        }
    })
});

module.exports = router;