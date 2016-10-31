import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchWeather} from '../actions';
import Weather from '../components/weather';
import Clock from '../components/clock';
import Forecast from '../components/forecast';
import Date from '../components/date';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchWeather());
    this.interval = setInterval(() => dispatch(fetchWeather()), 2 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {weather} = this.props;
    const {isInitializing, error} = weather;

    if (isInitializing) {
      return (
        <div className="App">
          <div className="DateTime">
            <Clock />
            <Date />
          </div>
          <div className="Initializing">
            Initializing...
          </div>
        </div>
      );
    }
    else if (error) {
      return (
        <div className="App">
          <div className="DateTime">
            <Clock />
            <Date />
          </div>
          <div className="Error">
            <h1>Error fetching weather data</h1>
            <p>Details: {error}</p>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <div className="DateTime">
            <Clock />
            <Date />
          </div>
          <Weather {...weather} />
          <Forecast {...weather} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
  };
};

export default connect(mapStateToProps)(App);
