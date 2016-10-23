import React, {Component} from 'react';
import {numberToOrdinal} from '../lib/conversions';


const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];


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
    const dayOfWeek = DAYS[now.getDay()];
    const dayOfMonth = now.getDate();
    const month = MONTHS[now.getMonth()];

    return {
      hours: hours > 12 ? hours - 12 : hours === 0 ? 12 : hours,
      minutes: minutes > 9 ? minutes : `0${minutes}`,
      seconds: seconds > 9 ? seconds : `0${seconds}`,
      period: hours > 12 ? 'pm' : 'am',
      dayOfWeek,
      dayOfMonth,
      month,
    };
  }

  render() {
    const {hours, minutes, seconds, period, dayOfWeek, dayOfMonth, month} = this.state;

    return (
      <div className="Clock">
        <div className="Clock-time">
          <span className="Clock-hours">{hours}</span>
          <span className="Clock-minutes">{minutes}</span>
          <span className="Clock-seconds">{seconds}</span>
          <span className="Clock-period">{period}</span>
        </div>
        <div className="Clock-date">
          {dayOfWeek}<br />
          {month}<br />
          {dayOfMonth}{numberToOrdinal(dayOfMonth)}
        </div>
      </div>
    )
  }
}

export default Clock;
