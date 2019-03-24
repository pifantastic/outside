import React, { Component } from "react";
import classNames from "classnames";

const INTERVAL = 5 * 1000;

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summaries: this.getSummaries(),
      currentSummary: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.nextSummary(), INTERVAL);
  }

  getSummaries() {
    const { weather } = this.props;

    return [
      weather.minutely.summary,
      weather.hourly.summary,
      weather.daily.summary
    ];
  }

  nextSummary() {
    let currentSummary = this.state.currentSummary + 1;

    if (currentSummary >= this.state.summaries.length) {
      currentSummary = 0;
    }

    this.setState({ currentSummary });
  }

  currentSummary() {
    return this.state.summaries[this.state.currentSummary];
  }

  render() {
    const className = classNames("Summary");
    return <div className={className}>{this.currentSummary()}</div>;
  }
}

export default Summary;
