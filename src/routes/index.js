var express = require('express');
var router = express.Router();
let Mongo = require("mongodb-curd");
let dbName = "4-22";
let cName = "aifan"
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/getdata', function(req, res, next) {
    Mongo.find(dbName, cName, {}, (rs) => {
        if (rs) {
            res.send({ code: 1, data: rs })
        }
    })
});

module.exports = router;