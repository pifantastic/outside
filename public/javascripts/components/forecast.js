import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';

const MAX_PIXELS = 150;
const MIN_PIXELS = 40;
const PADDING = 2;

class Forecast extends Component {
  render() {
    const {weather, isInitializing} = this.props;

    if (isInitializing) {
      return <div>Initializing...</div>;
    }

    const {hourly} = weather;

    // Grab the next 12 hours of data.
    const hours = hourly.slice(0, 18);

    // Calculate the maximum temperature to display.
    const maxTemp =
      hours.reduce((a, b) => {
        return Math.max(a, Math.round(b.temp.value));
      }, -Infinity) + PADDING;

    // Calculate the minimum temperature to display.
    const minTemp =
      hours.reduce((a, b) => {
        return Math.min(a, Math.round(b.temp.value));
      }, Infinity) - PADDING;

    return (
      <div className="Forecast">
        {hours.map((hour, index) => {
          const {temp, weather_code} = hour;

          const date = new Date();
          date.setTime(date.getTime() + index * 60 * 60 * 1000);
          const period = date.getHours() >= 12 ? 'pm' : 'am';
          const height =
            ((MAX_PIXELS - MIN_PIXELS) / 100) *
              (((Math.round(temp.value) - minTemp) / (maxTemp - minTemp)) *
                100) +
            MIN_PIXELS;

          const tempStyle = {
            bottom: height,
          };

          const barStyle = {
            height: height,
          };

          return (
            <div key={`hour-${index}`} className="Forecast-hour">
              <div className="Forecast-hour-temperature" style={tempStyle}>
                {Math.round(temp.value)}℉
              </div>
              <div className="Forecast-hour-icon">
                <Icon icon={weather_code.value} />
              </div>
              <div className="Forecast-hour-time">
                {date.getHours() > 12
                  ? date.getHours() - 12
                  : date.getHours() == 0
                  ? 12
                  : date.getHours()}
                {period}
              </div>
              <div className="Forecast-hour-bar" style={barStyle} />
            </div>
          );
        })}
      </div>
    );
  }
}

Forecast.propTypes = {
  weather: PropTypes.object,
  isInitializing: PropTypes.bool,
};

export default Forecast;
