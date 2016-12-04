const request = require('request-promise');
const NodeGeocoder = require('node-geocoder');
const config = require('../config');

const DARK_SKY_URL = 'https://api.darksky.net';

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

    if (!key) {
      throw new Error('You must configure a Dark Sky API key! See https://github.com/pifantastic/outside#configuration');
    }

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
        uri: `${DARK_SKY_URL}/forecast/${key}/${latitude},${longitude}`,
        json: true
      });
    }
  }
}

module.exports = Weather;
