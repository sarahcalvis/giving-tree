import React from 'react';
import { shallow } from 'enzyme';
import { MetaAdmin } from '../../screens/MetaAdmin';
    
describe('MetaAdmin', () => {
  it('renders shallowly without crashing', () => {
    const wrapper = shallow(<MetaAdmin/>);
    expect(wrapper).toMatchSnapshot();
  });


});