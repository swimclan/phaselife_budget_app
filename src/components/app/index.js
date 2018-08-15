import React, { Component } from 'react';
import getCategories from '../../services/get_categories';
import setItem from '../../services/set_item';
import deleteItem from '../../services/delete_item';
import Categories from '../categories';
import Hamburger from '../hamburger';
import History from '../history';
import Numeral from '../numeral';
import Progress from '../progress';
import Loader from '../loader';
import Confirm from '../confirm';
import getItems from '../../services/get_items';

class App extends Component {
  constructor(props) {
    super(props);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCloseConfirm = this.onCloseConfirm.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.hamburgerToggle = this.hamburgerToggle.bind(this);
    this.state = {
      categories: [],
      items: [],
      category: null,
      price: 0,
      submitted: false,
      hamburger: false,
      classes: {
        headingSecondary: 'bta-app-secondary-heading'
      }
    }
  }
  async componentDidMount() {
    try {
      const categories = await getCategories();
      const items = await getItems();
      this.setState({ categories, items });
    } catch (e) {
      // do nothing
    }
  }

  onCategoryChange(category) {
    this.setState({ category, submitted: false });
  }

  onPriceChange(increment) {
    this.setState({ price: this.state.price + increment, submitted: false});
  }

  async onDeleteItem(item) {
    try {
      await deleteItem(item);
      this.setState({ items: await getItems() });
    } catch (e) {
      // Do nothing
    }
  }

  async onSubmit(e) {
    e.stopPropagation();
    try {
      await setItem({ categoryId: this.state.category.id, price: this.state.price });
      this.setState({ items: await getItems() })
    } catch (e) {
      // do nothing
    }
    this.setState({ submitted: true, price: 0 });
  }

  flashSubmittedMsg() {
    this.setState({ classes: { headingSecondary: this.state.classes.headingSecondary + ' show' } });
    setTimeout(() => {
      this.setState({ classes: { headingSecondary: this.state.classes.headingSecondary.split(' ')[0] } });        
    }, 3000)
  }

  onCloseConfirm() {
    this.setState({ submitted: false });
  }

  categoryTotal(category) {
    return this.state.items
      .filter(item => item.category.id === category.id)
      .filter(item => new Date(item.createdAt).getMonth() === new Date().getMonth())
      .reduce((acc, val) => {
        return acc += val.price;
      }, 0);
  }

  hamburgerToggle(selected) {
    this.setState({ hamburger: selected });
  }

  allItemsTotal() {
    return this.state.items.reduce((acc, val) => {
      return acc += val.price;
    }, 0)
  }

  allCategoriesLimitTotal() {
    return this.state.categories.reduce((acc, val) => {
      return acc += val.limit;
    }, 0);
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
        <section className="bta-app-history-container">
          <History open={this.state.hamburger} items={this.state.items} onDelete={this.onDeleteItem} />
        </section>
        <section className="bta-app-confirm-container">
          <Confirm onClose={this.onCloseConfirm} current={this.allItemsTotal()} total={this.allCategoriesLimitTotal()} show={this.state.submitted}/>
        </section>
        <section className="bta-app-menu-container">
          <div className="bta-app-menu-hamburger">
            <Hamburger onToggle={this.hamburgerToggle} />
          </div>
        </section>
        <section className="bta-app-heading-container">
          <h1 className="bta-app-main-heading">Track an Item</h1>
          <h3 className={this.state.classes.headingSecondary}>Item submitted</h3>
        </section>
        <section className="bta-app-categories-container">
          {this.state.categories.length ? <Categories categories={this.state.categories} onChange={this.onCategoryChange} /> : <Loader />}
        </section>
        <section className="bta-app-progress-container">
          <Progress limit={this.state.category ? this.state.category.limit : 0} current={this.state.category ? this.categoryTotal(this.state.category) : 0} />
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
