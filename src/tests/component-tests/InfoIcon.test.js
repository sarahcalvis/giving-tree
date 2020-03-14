import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InfoIcon from "../../components/InfoIcon.js";

describe('Component: InfoIcon', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const message = "";
    const wrap = enzyme.mount(<InfoIcon infoMessage={message}/>)
    expect(wrap).toMatchSnapshot();
  });

})
