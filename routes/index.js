var express = require('express');
var router = express.Router();
const Weather = require('../lib/weather');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Outside',
  });
});

module.exports = router;
