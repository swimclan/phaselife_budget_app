import React, { Component } from 'react';
import getCategories from '../../services/get_categories';
import setItem from '../../services/set_item';
import Categories from '../categories';
import Numeral from '../numeral';
import Loader from '../loader';

class App extends Component {
  constructor(props) {
    super(props);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      categories: [],
      category: null,
      price: 0,
      submitted: false,
      classes: {
        headingSecondary: 'bta-app-secondary-heading'
      }
    }
  }
  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  onCategoryChange(category) {
    this.setState({ category, submitted: false });
  }

  onPriceChange(increment) {
    this.setState({ price: this.state.price + increment, submitted: false});
  }

  async onSubmit(e) {
    e.stopPropagation();
    await setItem({ categoryId: this.state.category.id, price: this.state.price });
    this.flashSubmittedMsg();
    this.setState({ submitted: true, price: 0 });
  }

  flashSubmittedMsg() {
    this.setState({ classes: { headingSecondary: this.state.classes.headingSecondary + ' show' } });
    setTimeout(() => {
      this.setState({ classes: { headingSecondary: this.state.classes.headingSecondary.split(' ')[0] } });        
    }, 3000)
  }

  render() {
    if (!this.state.categories.length) {
      return (
        <section className="bta-app-container">
          <Loader />
        </section>
      );
    }
    return (
      <div className="bta-app-container">
        <section className="bta-app-heading-container">
          <h1 className="bta-app-main-heading">Track an Item</h1>
          <h3 className={this.state.classes.headingSecondary}>Item submitted</h3>
        </section>
        <section className="bta-app-categories-container">
          {this.state.categories.length ? <Categories categories={this.state.categories} onChange={this.onCategoryChange} /> : <Loader />}
        </section>
        <section className="bta-app-price-container">
          <div className="bta-currency-label">$</div>
          <Numeral multiple={100} initial={0} increment={1} onChange={this.onPriceChange} reset={this.state.submitted} />
          <Numeral multiple={10} initial={0} increment={1} onChange={this.onPriceChange} reset={this.state.submitted} />
          <Numeral multiple={1} initial={0} increment={5} onChange={this.onPriceChange} reset={this.state.submitted} />
        </section>
        <section className="bta-app-submit-container">
          <button className="bta-app-submit-button" onClick={this.onSubmit}>SUBMIT</button>
        </section>
      </div>
    );
  }
}

export default App;
