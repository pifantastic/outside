import React, {Component} from 'react';
import {numberToOrdinal} from '../lib/conversions';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class _Date extends Component {
  constructor(props) {
    super(props);
    this.state = this.date();
  }

  componentWillMount() {
    this.interval = setInterval(() => this.setState(this.date()), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  date() {
    const now = new Date();
    const weekday = DAYS[now.getDay()];
    const day = now.getDate();
    const month = MONTHS[now.getMonth()];

    return {
      weekday,
      day,
      month,
    };
  }

  render() {
    const {weekday, day, month} = this.state;

    return (
      <div className="Date">
        <div className="Date-weekday">{weekday}</div>
        <div className="Date-date">
          {month} {day}
          {numberToOrdinal(day)}
        </div>
      </div>
    );
  }
}

export default _Date;
