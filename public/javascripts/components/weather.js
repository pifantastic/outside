import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';
import {degreesToDirection} from '../lib/conversions';
import AirQuality from './air_quality';

class Weather extends Component {
  render() {
    const {weather} = this.props;

    const {realtime, daily, hourly} = weather;
    const hour = hourly[0];
    const {
      temp,
      humidity,
      // summary,
      weather_code,
      wind_speed,
      wind_direction,
      epa_aqi,
      epa_health_concern,
    } = hour;
    const today = daily.length ? daily[0] : {};
    const [temperatureMin, temperatureMax] = today.temp;

    return (
      <div className="Weather">
        <div className="Weather-icon">
          <Icon icon={weather_code.value} />
          <div className="Weather-summary">{weather_code.value}</div>
        </div>
        <div className="Weather-temperature">
          {Math.round(temp.value)}℉
          <div className="Weather-temperature-highlow">
            {Math.round(temperatureMax.max.value)}℉ /{' '}
            {Math.round(temperatureMin.min.value)}℉
          </div>
        </div>
        <div className="Weather-stats">
          <table>
            <tbody>
              <tr>
                <th>humidity</th>
                <td>{Math.round(humidity.value)}%</td>
              </tr>
              <tr>
                <th>precipitation</th>
                <td>{Math.round(hour.precipitation_probability.value)}%</td>
              </tr>
              <tr>
                <th>wind</th>
                <td>
                  {wind_speed.value} mph{' '}
                  {degreesToDirection(wind_direction.value)}
                </td>
              </tr>
              <tr>
                <th>air quality</th>
                <td>
                  <AirQuality value={epa_aqi.value} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Weather.propTypes = {
  weather: PropTypes.object,
  isInitializing: PropTypes.bool,
};

export default Weather;
