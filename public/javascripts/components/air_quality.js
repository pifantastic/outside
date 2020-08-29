import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AirQuality extends Component {
  color() {
    const {value} = this.props;

    if (value <= 50) {
      return 'green';
    } else if (value <= 100) {
      return 'yellow';
    } else if (value <= 150) {
      return 'orange';
    } else if (value <= 200) {
      return 'red';
    } else if (value <= 300) {
      return 'purple';
    } else {
      return 'maroon';
    }
  }

  label() {
    const {value} = this.props;

    if (value <= 50) {
      return 'Good';
    } else if (value <= 100) {
      return 'Moderate';
    } else if (value <= 150) {
      return 'Unhealthy';
    } else if (value <= 200) {
      return 'Unhealthy';
    } else if (value <= 300) {
      return 'Very unhealthy';
    } else {
      return 'Hazardous';
    }
  }

  render() {
    const {value} = this.props;

    return (
      <div className={`AirQuality`}>
        {Math.round(value)}
        <span className={`AirQuality-badge AirQuality-badge--${this.color()}`}>
          {this.label()}
        </span>
      </div>
    );
  }
}

AirQuality.propTypes = {
  value: PropTypes.number,
  concern: PropTypes.string,
};

export default AirQuality;
