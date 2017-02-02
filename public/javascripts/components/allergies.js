import React, {Component} from 'react';
import classNames from 'classnames';
import {pollenSelector} from '../selectors';
import {connect} from 'react-redux';

class Allergies extends Component {
  render() {
    const {pollen} = this.props;

    const className = classNames('Allergies', {
      [`Allergies--${pollen}`]: !!pollen,
    });

    return (
      <div className={className} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pollen: pollenSelector(state),
  };
};

export default connect(mapStateToProps)(Allergies);
