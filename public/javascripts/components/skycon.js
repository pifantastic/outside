import React, {Component} from 'react';
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

export default Skycon;
