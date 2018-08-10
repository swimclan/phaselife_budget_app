import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.onClickCategory = this.onClickCategory.bind(this); 
    this.state = {
      selected: 0
    }
  }

  onClickCategory(e) {
    e.stopPropagation();
    this.setState({ selected: (this.state.selected + 1) % this.props.categories.length });
  }

  render() {
    return (
      <div className="bta-categories-container">
        <section onClick={this.onClickCategory} className="bta-categories-select-container">
          <article className="bta-categories-option">{this.props.categories.length ? this.props.categories[this.state.selected].name : 'loading'}</article>
        </section>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array
}
