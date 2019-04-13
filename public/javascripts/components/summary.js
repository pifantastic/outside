import React, {Component} from 'react';

// The amount of time (in milliseconds) to wait before advancing to the next
// summary.
const INTERVAL = 7 * 1000;

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSummary: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.nextSummary(), INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  nextSummary() {
    this.setState({currentSummary: this.state.currentSummary + 1});
  }

  currentSummary() {
    const {weather, isInitializing} = this.props;

    if (isInitializing) {
      return null;
    }

    const summaries = [
      weather.minutely.summary,
      weather.hourly.summary,
      weather.daily.summary,
    ];

    return summaries[this.state.currentSummary % summaries.length];
  }

  render() {
    return <div className="Summary">{this.currentSummary()}</div>;
  }
}

export default Summary;
