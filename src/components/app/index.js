import React, { Component } from 'react';
import { getCategories } from '../../services/categories';
import Categories from '../categories';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }
  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    return (
      <div className="bta-app-container">
        <section className="bta-app-heading-container">
          <h1 className="bta-app-main-heading">Track an Item</h1>
        </section>
        <section className="bta-app-categories-container">
          <Categories categories={[{id: 1, name: 'TRANSPORT'}]} />
        </section>
      </div>
    );
  }
}

export default App;
