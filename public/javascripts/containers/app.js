import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchWeather} from '../actions';
import Weather from '../components/weather';
import Clock from '../components/clock';
import Forecast from '../components/forecast';
import {
  sunsetSelector,
  sunriseSelector
} from '../selectors'

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
          <Clock />
          <div className="Initializing">
            Initializing...
          </div>
        </div>
      );
    }
    else if (error) {
      return (
        <div className="App">
          <Clock />
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
          <Clock />
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
    // sunrise: sunriseSelector(state),
    // sunset: sunsetSelector(state),
  };
};

export default connect(mapStateToProps)(App);
