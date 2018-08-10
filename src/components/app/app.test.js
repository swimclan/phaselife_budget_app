import React from 'react';
import App from './index';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const saved = {
  wrappers: {},
  spies: {},
  data: {}
}

describe('Testing <App />', () => {
  beforeEach(() => {
    saved.wrappers.app = mount(<App />);
  });
  test('<App /> will mount with container <div>', () => {
    expect(saved.wrappers.app.find('.bta-app-container').length).toEqual(1);
  });
});
