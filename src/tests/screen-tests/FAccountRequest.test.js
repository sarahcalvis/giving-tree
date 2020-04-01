import React from 'react';
import { shallow, mount } from 'enzyme';
import { FAccountRequest } from '../../screens/FAccountRequest';

describe('FAccountRequest', () => {

  beforeEach(() => {
    // wrapper = shallow(<MetaAdmin />);
  });

  it('renders shallowly without crashing', () => {
    const wrapper = shallow(<FAccountRequest />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders mounted without crashing', () => {
    const wrapper = mount(<FAccountRequest />);
  });

});