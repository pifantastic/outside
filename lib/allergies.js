const request = require('request-promise');
const config = require('../config');

const CLARITIN_URL = 'https://www.claritin.com';

class Allergies {
  forecast(zipCode) {
    return request({
      uri: `${CLARITIN_URL}/claritinapi/GlobalHeader/GetAllergyForecastData?zipcode=${zipCode}`
    }).then((allergies) => {
      // the fuck you doin' claritin
      // allergies = allergies.substring(1, allergies.length);
      // allergies = JSON.parse(JSON.parse(allergies))
      return allergies.pollenForecast;
    });
  }
}

module.exports = Allergies;
