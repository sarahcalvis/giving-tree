import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from "../../components/Footer.js";

describe('Component: Footer', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const wrap = enzyme.mount(<Footer/>)
    expect(wrap).toMatchSnapshot();
  });

})
