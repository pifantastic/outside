import React, {Component} from 'react';
import PropTypes from 'prop-types';
import skycons from 'skycons';

const Skycons = new skycons(window);

class Skycon extends Component {
  constructor(props) {
    super(props);

    this.iconRef = React.createRef();
    this.skycons = new Skycons({color: props.color});
  }

  componentDidMount() {
    const {icon} = this.props;

    this.skycons.add(this.iconRef.current, icon);
    this.skycons.play();
  }

  componentWillUnmount() {
    this.skycons.remove(this.iconRef.current);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.icon !== prevProps.icon) {
      this.skycons.set(this.iconRef.current, this.props.icon);
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
