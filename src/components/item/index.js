import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.itemRef = React.createRef();
    this.state = {
      selected: false,
      deleted: false
    }
  }

  componentDidMount() {
    const hammer = new Hammer(this.itemRef.current);
    hammer.on('swipe', (e) => {
      e.direction <= 2 && this.setState({ selected: true });
      e.direction >= 4 && this.setState({ selected: false });
    });
    this.itemRef.current.addEventListener('transitionend', (e) => {
      e.target.dataset && e.target.dataset.type === 'container' && this.props.onDelete(this.props.item);
    });
  }

  makeDate(date) {
    const dateObj = new Date(date);
    return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
  }

  onClickDelete(e) {
    e.stopPropagation();
    this.setState({ deleted: true });
  }

  render() {
    let containerClass = 'bta-item-container';
    this.state.selected && (containerClass += ' selected');
    this.state.deleted && (containerClass += ' deleted');
    return (
      <li className={containerClass} ref={this.itemRef} data-type="container">
        <section className="bta-item-date">{this.makeDate(this.props.item.createdAt)}</section>
        <section className="bta-item-category">{this.props.item.category.name}</section>
        <section className="bta-item-price">{`$${this.props.item.price}`}</section>
        <section className="bta-item-delete" onClick={this.onClickDelete}>Delete</section>
      </li>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object,
  onDelete: PropTypes.func
}
