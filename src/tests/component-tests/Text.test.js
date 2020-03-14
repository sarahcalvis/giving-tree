import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Text from "../../components/Text.js";

describe('Component: Text', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const text = "my text";
    const type = 'h1';
    const wrap = enzyme.mount(<Text text={text} type={type}/>)
    expect(wrap).toMatchSnapshot();
  });

})
