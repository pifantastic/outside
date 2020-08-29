const request = require('request-promise');
const config = require('../config');

const CLIMACELL_URL = 'https://api.climacell.co/v3/weather';

const FIELDS = [
  'temp',
  'feels_like',
  'humidity',
  'wind_speed',
  'wind_direction',
  'precipitation',
  'sunrise',
  'sunset',
  'weather_code',
];

const AIR_QUALITY = [
  'pm25',
  'pm10',
  'o3',
  'no2',
  'co',
  'so2',
  'epa_aqi',
  'epa_primary_pollutant',
  'epa_health_concern',
];

const REALTIME_FIELDS = [
  ...FIELDS,
  ...AIR_QUALITY,
  'precipitation_type',
  'cloud_cover',
];

const HOURLY_FIELDS = [
  ...FIELDS,
  ...AIR_QUALITY,
  'precipitation_type',
  'precipitation_probability',
  'cloud_cover',
];

const DAILY_FIELDS = [...FIELDS];

class Weather {
  constructor(key) {
    this.key = key;
  }

  get(path, fields) {
    const key =
      config.climacell.keys[
        Math.floor(Math.random() * config.climacell.keys.length)
      ];

    if (!key) {
      throw new Error(
        'You must configure a Cimacell API key! See https://github.com/pifantastic/outside#configuration',
      );
    }

    return request({
      json: true,
      method: 'GET',
      url: `${CLIMACELL_URL}/${path}`,
      qs: {
        unit_system: 'us',
        apikey: key,
        lat: config.location.latitude,
        lon: config.location.longitude,
        fields: fields.join(','),
      },
    });
  }

  realtime() {
    return this.get('realtime', REALTIME_FIELDS).then((result) => {
      return {realtime: result};
    });
  }

  hourly() {
    return this.get('forecast/hourly', HOURLY_FIELDS).then((result) => {
      return {hourly: result};
    });
  }

  daily() {
    return this.get('forecast/daily', DAILY_FIELDS).then((result) => {
      return {daily: result};
    });
  }

  forecast() {
    return new Promise((resolve, reject) => {
      Promise.all([this.realtime(), this.hourly(), this.daily()]).then(
        (values) => {
          resolve(Object.assign(...values));
        },
      );
    });
  }
}

module.exports = Weather;
