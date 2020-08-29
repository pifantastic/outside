import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icon from './icon';

const SUN_FORMAT = 'h:mm a';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = this.time();
    this.interval = setInterval(() => this.setState(this.time()), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  time() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return {
      hours: hours > 12 ? hours - 12 : hours === 0 ? 12 : hours,
      minutes: minutes > 9 ? minutes : `0${minutes}`,
      period: hours >= 12 ? 'pm' : 'am',
    };
  }

  renderSun() {
    const {weather, isInitializing} = this.props;

    if (isInitializing) {
      return null;
    }

    const {daily} = weather;

    const data = daily.length ? daily[0] : null;

    if (!data) {
      return null;
    }

    return (
      <div className="Clock-sun">
        <div className="Clock-sunrise">
          <Icon icon="sunrise" />{' '}
          {moment(data.sunrise.value).format(SUN_FORMAT)}
        </div>
        <div className="Clock-sunset">
          <Icon icon="sunset" /> {moment(data.sunset.value).format(SUN_FORMAT)}
        </div>
      </div>
    );
  }

  render() {
    const {hours, minutes, period} = this.state;

    return (
      <div className="Clock">
        <div className="Clock-time">
          <span className="Clock-hours">{hours}</span>
          <span className="Clock-minutes">{minutes}</span>
          <span className="Clock-period">{period}</span>
        </div>
        {this.renderSun()}
      </div>
    );
  }
}

Clock.propTypes = {
  weather: PropTypes.object,
  isInitializing: PropTypes.bool,
};

export default Clock;
