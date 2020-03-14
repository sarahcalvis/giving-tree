import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ContactPopout from "../../components/ContactPopout.js";

describe('Component: ContactPopout', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const mockCfData = "mockCfData";
    const mockNonprofitData = "mockNonprofitData";
    const wrap = enzyme.mount(<ContactPopout cfData={mockCfData} nonprofitData={mockNonprofitData} />)
    expect(wrap).toMatchSnapshot();
  });  

  it('contact button registers clicks', () => {
    const mockCfData = "mockCfData";
    const mockNonprofitData = "mockNonprofitData";
    const click = jest.fn();
    const wrap = enzyme.mount(<ContactPopout cfData={mockCfData} nonprofitData={mockNonprofitData} />)
    const contactButton = wrap.find('#contact-button').at(0);
    contactButton.props().onChange({ target: { value: "posting"} });
    expect(contactButton.mock.calls.length).toBe(1);
    expect(contactButton.mock.calls[0][0]).toBe("posting");
  });

})