const express = require('express');
const router = express.Router();
const Weather = require('../lib/weather');
const config = require('../config');

router.get('/weather', function(req, res, next) {
  const weather = new Weather();

  weather.forecast(config.location)
    .then((forecast) => {
      res.json(forecast);
    })
    .catch(next);

  // return;

  // const now = new Date();
  // const HOUR = 60 * 60 * 1000;
  // res.json({
  //   currently: {
  //     apparentTemperature: 78,
  //     humidity: 0.24,
  //     summary: 'Clear',
  //   },
  //   hourly: {
  //     data: [
  //       {
  //         time: new Date().getTime() / 1000,
  //         temperature: 78,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + HOUR).getTime() / 1000,
  //         temperature: 79,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (2 * HOUR)).getTime() / 1000,
  //         temperature: 80,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (3 * HOUR)).getTime() / 1000,
  //         temperature: 81,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (4 * HOUR)).getTime() / 1000,
  //         temperature: 81,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (5 * HOUR)).getTime() / 1000,
  //         temperature: 79,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (6 * HOUR)).getTime() / 1000,
  //         temperature: 78,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (7 * HOUR)).getTime() / 1000,
  //         temperature: 77,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (8 * HOUR)).getTime() / 1000,
  //         temperature: 76,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (9 * HOUR)).getTime() / 1000,
  //         temperature: 75,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (10 * HOUR)).getTime() / 1000,
  //         temperature: 74,
  //         summary: 'Clear'
  //       },
  //       {
  //         time: new Date(now.getTime() + (11 * HOUR)).getTime() / 1000,
  //         temperature: 73,
  //         summary: 'Clear'
  //       }
  //     ]
  //   }
  // })
});

module.exports = router;
