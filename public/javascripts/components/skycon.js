import React, {Component} from 'react';
import PropTypes from 'prop-types';
import skycons from 'skycons';

const Skycons = new skycons(window);

const MAP = {
  freezing_rain_heavy: 'sleet',
  freezing_rain: 'sleet',
  freezing_rain_light: 'sleet',
  freezing_drizzle: 'sleet',
  ice_pellets_heavy: 'sleet',
  ice_pellets: 'sleet',
  ice_pellets_light: 'sleet',
  snow_heavy: 'snow',
  snow: 'snow',
  snow_light: 'snow',
  flurries: 'rain',
  tstorm: 'rain',
  rain_heavy: 'rain',
  rain: 'rain',
  rain_light: 'rain',
  drizzle: 'rain',
  fog_light: 'fog',
  fog: 'fog',
  cloudy: 'cloudy',
  mostly_cloudy: 'cloudy',
  partly_cloudy: 'cloudy',
  mostly_clear: 'clear-day',
  clear: 'clear-day',
};

class Skycon extends Component {
  constructor(props) {
    super(props);

    this.iconRef = React.createRef();
    this.skycons = new Skycons({color: props.color});
  }

  componentDidMount() {
    const {icon} = this.props;

    this.skycons.add(this.iconRef.current, MAP[icon]);
    this.skycons.play();
  }

  componentWillUnmount() {
    this.skycons.remove(this.iconRef.current);
  }

  componentDidUpdate(prevProps) {
    if (this.props.icon !== prevProps.icon) {
      this.skycons.set(this.iconRef.current, MAP[this.props.icon]);
    }
  }

  render() {
    const {width, height} = this.props;

    return (
      <canvas
        className="Skycon"
        ref={this.iconRef}
        width={width}
        height={height}
      />
    );
  }
}

Skycon.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Skycon;
