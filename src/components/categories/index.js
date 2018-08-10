import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './categories.scss';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }
  render() {
    return (
      <div className="bta-categories-container">
        <section className="bta-categories-select-container">
          {this.props.categories.map(category => <article key={category.id} className="bta-categories-option">{category.name}</article>)}
        </section>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array
}
