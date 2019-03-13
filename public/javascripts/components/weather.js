import React, {Component} from 'react';
import Icon from './icon';
import {degreesToDirection} from '../lib/conversions';


class Weather extends Component {
  render() {
    const {weather} = this.props;

    const {currently, hourly, daily} = weather;
    const {
      temperature,
      humidity,
      summary,
      icon,
      precipProbability,
      windSpeed,
      windBearing,
    } = currently;
    const today = daily.data.length ? daily.data[0] : {};
    const todaySummary = today.summary;
    const {
      temperatureMax,
      temperatureMin,
    } = today;

    return (
      <div className="Weather">
        <div className="Weather-icon">
          <Icon icon={icon} />
          <div className="Weather-summary">
            {summary}
          </div>
        </div>
        <div className="Weather-temperature">
          {Math.round(temperature)}℉
          <div className="Weather-temperature-highlow">
            {Math.round(temperatureMax)}℉ / {Math.round(temperatureMin)}℉
          </div>
          <div className="Weather-today-summary">
            {todaySummary}
          </div>
        </div>
        <div className="Weather-stats">
          <table>
            <tbody>
              <tr>
                <th>humidity</th>
                <td>{Math.round(humidity * 100)}%</td>
              </tr>
              <tr>
                <th>precipitation</th>
                <td>{Math.round(precipProbability * 100)}%</td>
              </tr>
              <tr>
                <th>wind</th>
                <td>{windSpeed} mph {degreesToDirection(windBearing + 180)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Weather;
