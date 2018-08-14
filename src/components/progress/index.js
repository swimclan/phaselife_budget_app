import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.progressRef = React.createRef();
    this.state = {
      displayed: true
    }
  }

  componentDidMount() {
    this.progressRef.current.addEventListener('transitionstart', (e) => {
      this.setState({ displayed: false });
    });
    this.progressRef.current.addEventListener('transitionend', (e) => {
      this.setState({ displayed: true });
    });
  }

  render() {
    const percent = this.props.current / this.props.limit * 100;
    let progressBarClass = 'bta-progress-bar';
    percent < 34 && (progressBarClass += ' good');
    percent >= 34 && percent <= 66 && (progressBarClass += ' warning');
    percent > 66 && (progressBarClass += ' danger');
    return (
      <div className="bta-progress-container">
        <div 
          ref={this.progressRef}
          className={progressBarClass}
          style={ { width: `${percent > 100 ? 100 : percent}%`, paddingRight: percent > 10 ? '5px' : '0' } }
        >
          <span className={'bta-progress-spent' + (this.state.displayed ? ' displayed' : '')}>{percent > 10 ? `$${this.props.current}`: null}</span>
        </div>
      </div>
    );
  }
}

Progress.propTypes = {
  current: PropTypes.number,
  limit: PropTypes.number
}
