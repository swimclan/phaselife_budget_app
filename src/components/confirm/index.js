import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.onClickOk = this.onClickOk.bind(this);
  }
  onClickOk(e) {
    e.stopPropagation();
    this.props.onClose();
  }

  render() {
    const difference = this.props.total - this.props.current;
    const overUnder = difference >= 0 ? 'under' : 'over';
    return (
      <div className={'bta-confirm-container' + (this.props.show ? ' show' : '')}>
        <div className="bta-confirm-overlay">
          <article className={'bta-confirm-content' + (this.props.show ? ' show' : '')}>
            <section className="bta-confirm-content-heading-container">
              <h3 className="bta-confirm-content-heading">Item has been submitted</h3>
            </section>
            <section className="bta-confirm-content-body-container">
              <div className="bta-confirm-content-body">
                <p>{`You are $${Math.abs(this.props.total - this.props.current)}`} <span className={`bta-confirm-content-overunder ${overUnder}`}>{`${overUnder}`}</span> budget this month</p>
              </div>
            </section>
            <section className="bta-confirm-content-button-container">
              <button onClick={this.onClickOk} className="bta-confirm-content-button">OK</button>
            </section>
          </article>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  show: PropTypes.bool,
  onClose: PropTypes.func
}
