import React, {Component} from 'react';

const FORECAST_ICONS = {
  'clear-day': 'day-sunny',
  'clear-night': 'night-clear',
  'rain': 'rain',
  'snow': 'snow',
  'sleet': 'sleet',
  'wind': 'strong-wind',
  'fog': 'fog',
  'cloudy': 'cloud',
  'partly-cloudy-day': 'day-cloudy',
  'partly-cloudy-night': 'night-cloudy',
};

class Icon extends Component {
  render() {
    const {icon} = this.props;
    return <i className={`Icon wi wi-${FORECAST_ICONS[icon]}`}></i>;
  }
}

export default Icon;
