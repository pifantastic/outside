import React, {Component} from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = this.time();
  }

  componentWillMount() {
    this.interval = setInterval(() => this.setState(this.time()), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  time() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return {
      hours: hours > 12 ? hours - 12 : hours,
      minutes: minutes > 9 ? minutes : `0${minutes}`,
      seconds: seconds > 9 ? seconds : `0${seconds}`,
      period: hours > 12 ? 'pm' : 'am',
    };
  }

  render() {
    const {hours, minutes, seconds, period} = this.state;

    return (
      <div className="Clock">
        <span className="Clock-hours">{hours}</span>
        <span className="Clock-minutes">{minutes}</span>
        <span className="Clock-seconds">{seconds}</span>
        <span className="Clock-period">{period}</span>
      </div>
    )
  }
}

export default Clock;
