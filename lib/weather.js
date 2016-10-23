const request = require('request-promise');
const NodeGeocoder = require('node-geocoder');

const DARK_SKY_URL = 'https://api.darksky.net';
const DARK_SKY_KEY = '05feeba877372da1f248582b9e0461a0';

const GOOGLE_GEOCODER_API_KEY = 'AIzaSyB5QIYIUsaFHtzQMC-nfAYLRtMa_VAv0nU';


class Weather {
  constructor(key) {
    this.key = key;
  }

  geocode(location) {
    const options = {
      provider: 'google',
      apiKey: GOOGLE_GEOCODER_API_KEY,
    };

    return NodeGeocoder(options).geocode(location);
  }

  forecast(location) {
    if (typeof location === 'string') {
      return this.geocode(location).then((results) => {
        if (!results.length) {
          return Promise.reject(new Error(`Location not found ${location}`));
        }

        const {latitude, longitude} = results[0];

        return request({
          uri: `${DARK_SKY_URL}/forecast/${DARK_SKY_KEY}/${latitude},${longitude}`,
          json: true
        });
      });
    }
    else {
      const {latitude, longitude} = location;

      return request({
        uri: `${DARK_SKY_URL}/forecast/${DARK_SKY_KEY}/${latitude},${longitude}`,
        json: true
      });
    }
  }
}

module.exports = Weather;
