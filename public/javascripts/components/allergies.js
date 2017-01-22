import React, {Component} from 'react';
import classNames from 'classnames';

class Allergies extends Component {
  formatPollen(pollen) {
    if (pollen <= 2.4) {
      return 'low';
    }
    else if (pollen <= 4.8) {
      return 'medium-low';
    }
    else if (pollen <= 7.2) {
      return 'medium';
    }
    else if (pollen <= 9.6) {
      return 'high-medium';
    }
    else if (pollen > 9.6) {
      return 'high';
    }
    else {
      return null;
    }
  }

  render() {
    const {allergies} = this.props;
    const {forecast} = allergies;
    const today = forecast[0];

    const className = classNames('Allergies', {
      [`Allergies--${this.formatPollen(today)}`]: !!today,
    });

    return (
      <div className={className} />
    )
  }
}

export default Allergies;
