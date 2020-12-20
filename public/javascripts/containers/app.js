import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchWeather} from '../actions';
import Weather from '../components/weather';
import Clock from '../components/clock';
import Forecast from '../components/forecast';
import DateComponent from '../components/date';
import Summary from '../components/summary';
import classNames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'day',
      hour: new Date().getHours(),
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(fetchWeather());

    this.setTheme();

    this.weatherInterval = setInterval(
      () => dispatch(fetchWeather()),
      10 * 60 * 1000,
    );
    this.themeInterval = setInterval(() => this.setTheme(), 1 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.weatherInterval);
    clearInterval(this.themeInterval);
  }

  setTheme() {
    const hour = new Date().getHours();
    const theme = hour >= 23 || hour <= 6 ? 'night' : 'day';

    this.setState({
      theme: theme,
      hour: hour,
    });
  }

  render() {
    const {theme, hour} = this.state;
    const {weather} = this.props;
    const {isInitializing, error} = weather;
    const className = classNames('App', {
      'App--night': theme === 'night',
      [`App--hour-${hour}`]: true,
    });

    if (isInitializing) {
      return (
        <div className={className}>
          <div className="DateTime">
            <Clock isInitializing={isInitializing} />
            <DateComponent />
          </div>
          <div className="Initializing">Initializing...</div>
        </div>
      );
    } else if (error) {
      return (
        <div className={className}>
          <div className="DateTime">
            <Clock isInitializing={isInitializing} />
            <DateComponent />
          </div>
          <div className="Error">
            <h1>Error fetching weather data</h1>
            <p>Details: {error}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className={className}>
          <div className="DateTime">
            <Clock {...weather} />
            <DateComponent />
          </div>
          {/* <Summary {...weather} /> */}
          <Weather {...weather} />
          <Forecast {...weather} />
        </div>
      );
    }
  }
}

App.propTypes = {
  weather: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
  };
};

export default connect(mapStateToProps)(App);
