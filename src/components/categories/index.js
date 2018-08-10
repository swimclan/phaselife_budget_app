import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.onClickCategory = this.onClickCategory.bind(this); 
    this.state = {
      index: 0
    }
  }

  componentDidMount() {
    this.props.onChange(this.props.categories[this.state.index]);
  }

  onClickCategory(e) {
    e.stopPropagation();
    let index = (this.state.index + 1) % this.props.categories.length
    this.setState({ index });
    this.props.onChange(this.props.categories[index]);
  }

  render() {
    return (
      <div className="bta-categories-container">
        <section onClick={this.onClickCategory} className="bta-categories-select-container">
          <article className="bta-categories-option">{this.props.categories[this.state.index].name}</article>
        </section>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array,
  onChange: PropTypes.func
}
