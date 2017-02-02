const express = require('express');
const router = express.Router();
const Weather = require('../lib/weather');
const Allergies = require('../lib/allergies');
const config = require('../config');

router.get('/weather', function(req, res, next) {
  const weather = new Weather();

  weather.forecast(config.location)
    .then((forecast) => {
      res.json(forecast);
    })
    .catch((error) => {
      res.status(error.statusCode).json({
        error: {
          message: error.error,
        },
      });
    });
});

router.get('/allergies', function(req, res, next) {
  const allergies = new Allergies();

  allergies.forecast(config.zipCode)
    .then((forecast) => {
      res.json(forecast);
    })
    .catch((error) => {
      res.status(error.statusCode).json({
        error: {
          message: 'Error fetching allergy forecast',
        },
      });
    });
});

module.exports = router;
