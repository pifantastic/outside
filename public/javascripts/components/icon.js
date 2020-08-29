import React, {Component} from 'react';
import PropTypes from 'prop-types';

export const FORECAST_ICONS = {
  clear: 'day-sunny',
  mostly_clear: 'day-sunny',
  // 'clear-night': 'night-clear',
  rain: 'rain',
  rain_heavy: 'rain',
  rain_light: 'rain',
  drizzle: 'rain',
  snow: 'snow',
  snow_light: 'snow',
  snow_heavy: 'snow',
  freezing_rain: 'sleet',
  freezing_rain_heavy: 'sleet',
  freezing_rain_light: 'sleet',
  freezing_drizzle: 'sleet',
  ice_pellets_heavy: 'sleet',
  ice_pellets: 'sleet',
  ice_pellets_light: 'sleet',
  flurries: 'sleet',
  wind: 'strong-wind',
  fog: 'fog',
  fog_light: 'fog',
  cloudy: 'cloud',
  mostly_cloudy: 'cloud',
  partly_cloudy: 'cloud',
  tstorm: 'cloud',

  sunrise: 'sunrise',
  sunset: 'sunset',
};

class Icon extends Component {
  render() {
    const {icon} = this.props;
    return <i className={`Icon wi wi-${FORECAST_ICONS[icon]}`} />;
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
};

export default Icon;
