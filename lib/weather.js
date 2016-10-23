const request = require('request-promise');
const NodeGeocoder = require('node-geocoder');
const config = require('../config');


class Weather {
  constructor(key) {
    this.key = key;
  }

  geocode(location) {
    const options = {
      provider: 'google',
      apiKey: config.google.geocoder.key,
    };

    return NodeGeocoder(options).geocode(location);
  }

  forecast(location) {
    const key = config.darksky.keys[Math.floor(Math.random() * config.darksky.keys.length)];

    if (typeof location === 'string') {
      return this.geocode(location).then((results) => {
        if (!results.length) {
          return Promise.reject(new Error(`Location not found ${location}`));
        }

        const {latitude, longitude} = results[0];

        return request({
          uri: `${DARK_SKY_URL}/forecast/${key}/${latitude},${longitude}`,
          json: true
        });
      });
    }
    else {
      const {latitude, longitude} = location;

      return request({
        uri: `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`,
        json: true
      });
    }
  }
}

module.exports = Weather;
