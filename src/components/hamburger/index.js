import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Hamburger extends Component {
  constructor(props) {
    super(props);
    this.onClickHamburger = this.onClickHamburger.bind(this);
    this.state = {
      selected: false
    };
  }

  onClickHamburger(e) {
    e.stopPropagation();
    this.props.onToggle(!this.state.selected);
    this.setState({ selected: !this.state.selected });
    
  }

  render() {
    let containerClass = 'bta-hamburger-container';
    containerClass = this.state.selected ? (containerClass + ' selected') : containerClass;
    return (
      <div className={containerClass} onClick={this.onClickHamburger}>
        <article className="bta-hamburger-dot"></article>
        <article className="bta-hamburger-dot"></article>
        <article className="bta-hamburger-dot"></article>
      </div>
    );    
  }
}

Hamburger.propTypes = {
  onToggle: PropTypes.func
}
