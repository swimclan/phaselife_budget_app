import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.onClickCategory = this.onClickCategory.bind(this);
    this.move = this.move.bind(this);
    this.state = {
      index: 0
    }
  }

  componentDidMount() {
    this.props.onChange(this.props.categories[this.state.index]);
  }

  onClickCategory(e) {
    e.stopPropagation();
    let index = this.calcNextIndex(1);
    this.setState({ index });
    this.props.onChange(this.props.categories[index]);
  }

  move(steps) {
    let index = this.calcNextIndex(steps);
    this.setState({ index });
  }

  calcNextIndex(step) {
    const currentIndex = this.state.index || this.props.categories.length;
    return (currentIndex + step) % this.props.categories.length;
  }

  render() {
    return (
      <div className="bta-categories-container">
        <button className="bta-categories-paddle paddle-left" onClick={() => this.move(-1)}></button>
        <section onClick={this.onClickCategory} className="bta-categories-select-container">
          <article className="bta-categories-option">{this.props.categories[this.state.index].name}</article>
        </section>
      <button className="bta-categories-paddle paddle-right" onClick={() => this.move(1)}></button>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array,
  onChange: PropTypes.func
}
