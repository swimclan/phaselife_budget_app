import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Progress extends Component {
  render() {
    const percent = this.props.current / this.props.limit * 100;
    let progressBarClass = 'bta-progress-bar';
    percent < 34 && (progressBarClass += ' good');
    percent >= 34 && percent <= 66 && (progressBarClass += ' warning');
    percent > 66 && (progressBarClass += ' danger');
    return (
      <div className="bta-progress-container">
        <div className={progressBarClass} style={ { width: `${percent}%` } }></div>
      </div>
    );
  }
}

Progress.propTypes = {
  current: PropTypes.number,
  limit: PropTypes.number
}
