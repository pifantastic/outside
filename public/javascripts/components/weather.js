import React, {Component} from 'react';
import Icon from './icon';
import {degreesToDirection} from '../lib/conversions';


class Weather extends Component {
  render() {
    const {weather} = this.props;

    const {currently, hourly} = weather;
    const {
      temperature,
      humidity,
      summary,
      icon,
      precipProbability,
      windSpeed,
      windBearing,
      visibility,
    } = currently;

    return (
      <div className="Weather">
        <div className="Weather-overview">
          <span className="Weather-icon">
            <Icon icon={icon} />
          </span>
          <span className="Weather-summary">
            {summary}
          </span>
          <span className="Weather-temperature">
            {Math.round(temperature)}℉
          </span>
          <span className="Weather-stats">
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
                <tr>
                  <th>visibility</th>
                  <td>{visibility.toFixed(2)} miles</td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
      </div>
    );
  }
}

export default Weather;
