import React, {Component} from 'react';
import Icon from './icon';

const MAX_PIXELS = 150;
const MIN_PIXELS = 40;
const PADDING = 5;

class Forecast extends Component {
  render() {
    const {weather, isInitializing} = this.props;

    if (isInitializing) {
      return <div>Initializing...</div>;
    }

    const {hourly} = weather;

    // Grab the next 12 hours of data.
    const hours = hourly.data.slice(1, 13);

    // Calculate the maximum temperature to display.
    const maxTemp = hours.reduce((a, b) => {
      return Math.max(a, Math.round(b.temperature));
    }, -Infinity) + PADDING;

    // Calculate the minimum temperature to display.
    const minTemp = hours.reduce((a, b) => {
      return Math.min(a, Math.round(b.temperature));
    }, Infinity) - PADDING;

    return (
      <div className="Forecast">
        {hours.map((hour) => {
          const {time, summary, temperature, icon} = hour;

          const date = new Date(time * 1000);
          const period = date.getHours() >= 12 ? 'pm' : 'am';
          const height = ((MAX_PIXELS - MIN_PIXELS) / 100) *
            (((Math.round(temperature) - minTemp) / (maxTemp - minTemp)) * 100) + MIN_PIXELS;

          const tempStyle = {
            bottom: height,
          }

          const barStyle = {
            height: height,
          };

          return (
            <div key={time} className="Forecast-hour">
              <div className="Forecast-hour-temperature" style={tempStyle}>
                {Math.round(temperature)}℉
              </div>
              <div className="Forecast-hour-icon">
                <Icon icon={icon} />
              </div>
              <div className="Forecast-hour-time">
                {date.getHours() > 12 ? date.getHours() - 12 : date.getHours() == 0 ? 12 : date.getHours()}
                {period}
              </div>
              <div className="Forecast-hour-bar" style={barStyle}></div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Forecast;
