import React, { Component } from "react";
import moment from "moment";
import { numberToOrdinal } from "../lib/conversions";

const SUN_FORMAT = "h:mm a";

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

    return {
      hours: hours > 12 ? hours - 12 : hours === 0 ? 12 : hours,
      minutes: minutes > 9 ? minutes : `0${minutes}`,
      period: hours >= 12 ? "pm" : "am"
    };
  }

  renderSun() {
    const { weather, isInitializing, isLoading } = this.props;

    if (isLoading || isInitializing) {
      return null;
    }

    const { daily } = weather;

    const data = daily.data.length ? daily.data[0] : null;

    if (!data) {
      return null;
    }

    return (
      <span className="Clock-sun">
        <span className="Clock-sunrise">
          {moment(data.sunriseTime * 1000).format(SUN_FORMAT)}
        </span>
        <span className="Clock-sunset">
          {moment(data.sunsetTime * 1000).format(SUN_FORMAT)}
        </span>
      </span>
    );
  }

  render() {
    const { hours, minutes, seconds, period } = this.state;

    return (
      <div className="Clock">
        <div className="Clock-time">
          <span className="Clock-hours">{hours}</span>
          <span className="Clock-minutes">{minutes}</span>
          <span className="Clock-period">{period}</span>
          {this.renderSun()}
        </div>
      </div>
    );
  }
}

export default Clock;
