import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Numeral extends Component {
  constructor(props) {
    super(props);
    this.onClickNumeral = this.onClickNumeral.bind(this);
    this.state = {
      value: props.initial
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.reset === true && prevProps.reset === false) {
      this.setState({ value: this.props.initial });
    }
  }

  onClickNumeral(e) {
    e.stopPropagation();
    let value = (this.state.value + this.props.increment) % 10;
    this.setState({ value });
    this.props.onChange(value ? this.props.multiple * this.props.increment : -((10 - this.props.increment) * this.props.multiple));
  }

  render() {
    return (
      <div className="bta-numeral-container">
        <section onClick={this.onClickNumeral} className="bta-numeral-select-container">
          <article className="bta-numeral-option">{this.state.value}</article>
        </section>
      </div>
    );
  }
}

Numeral.propTypes = {
  multiple: PropTypes.number,
  initial: PropTypes.number,
  increment: PropTypes.number,
  onChange: PropTypes.func,
  reset: PropTypes.bool
}