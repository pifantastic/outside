import React, { Component } from "react";
import moment from "moment";
import { numberToOrdinal } from "../lib/conversions";
import Icon from "./icon";

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
      <div className="Clock-sun">
        <div className="Clock-sunrise">
          <Icon icon="sunrise" />{" "}
          {moment(data.sunriseTime * 1000).format(SUN_FORMAT)}
        </div>
        <div className="Clock-sunset">
          <Icon icon="sunset" />{" "}
          {moment(data.sunsetTime * 1000).format(SUN_FORMAT)}
        </div>
      </div>
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
        </div>
        {this.renderSun()}
      </div>
    );
  }
}

export default Clock;
