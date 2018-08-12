import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';

export default class History extends Component {
  items() {
    return this.props.items
      .filter(item => new Date(item.createdAt).getMonth() === new Date().getMonth())
      .map(item => (
        <Item key={item.id} item={item} onDelete={this.props.onDelete} />
      ));
  }

  render() {
    return (
      <div className={'bta-history-container' + (this.props.open ? ' open' : '')}>
        <div className="bta-history-header-block">
          <h3 className="bta-history-heading">This Month</h3>
        </div>
        <ul className="bta-history-item-list">
          {this.items()}
        </ul>
      </div>
    );
  }
}

History.propTypes = {
  open: PropTypes.bool,
  items: PropTypes.array,
  onDelete: PropTypes.func
}
