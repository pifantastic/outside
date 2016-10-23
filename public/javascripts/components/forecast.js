import React, {Component} from 'react';
import Icon from './icon';


class Forecast extends Component {
  render() {
    const {weather, isInitializing} = this.props;

    if (isInitializing) {
      return <div>Initializing...</div>;
    }

    const {hourly} = weather;
    const hours = hourly.data.slice(1, 13);

    const maxTemp = hours.reduce((a, b) => {
      return Math.max(a, b.temperature);
    }, -Infinity);

    const minTemp = hours.reduce((a, b) => {
      return Math.min(a, b.temperature);
    }, Infinity);

    const maxPixels = 100;
    const minPixels = 35;

    return (
      <div className="Forecast">
        {hours.map((hour) => {
          const {time, summary, temperature, icon} = hour;

          const date = new Date(time * 1000);
          const period = date.getHours() > 12 ? 'pm' : 'am';
          const height = ((maxPixels - minPixels) / 100) *
            (((temperature - minTemp) / (maxTemp - minTemp)) * 100) + minPixels;

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
                {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}
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
