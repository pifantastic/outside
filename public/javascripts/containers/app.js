import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchWeather, fetchAllergies} from '../actions';
import Weather from '../components/weather';
import Clock from '../components/clock';
import Forecast from '../components/forecast';
import DateComponent from '../components/date';
import Allergies from '../components/allergies';
import classNames from 'classnames';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      theme: 'day',
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(fetchWeather());
    dispatch(fetchAllergies());

    this.setTheme();

    this.weatherInterval = setInterval(() => dispatch(fetchWeather()), 5 * 60 * 1000);
    this.allergyInterval = setInterval(() => dispatch(fetchAllergies()), 10 * 60 * 1000);
    this.themeInterval = setInterval(() => this.setTheme(), 1 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.weatherInterval);
    clearInterval(this.themeInterval);
    clearInterval(this.allergyInterval);
  }

  setTheme() {
    const hour = new Date().getHours();
    const theme = (hour >= 23 || hour <= 7) ? 'night' : 'day';

    this.setState({theme: theme});
  }

  render() {
    const {theme} = this.state;
    const {weather, allergies} = this.props;
    const {isInitializing, error} = weather;
    const className = classNames('App', {
      'App--night': theme === 'night',
    });

    if (isInitializing) {
      return (
        <div className={className}>
          <div className="DateTime">
            <Clock />
            <DateComponent />
          </div>
          <div className="Initializing">
            Initializing...
          </div>
        </div>
      );
    }
    else if (error) {
      return (
        <div className={className}>
          <div className="DateTime">
            <Clock />
            <DateComponent />
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
        <div className={className}>
          <div className="DateTime">
            <Clock />
            <DateComponent />
          </div>
          <Allergies {...allergies} />
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
    allergies: state.allergies,
  };
};

export default connect(mapStateToProps)(App);
