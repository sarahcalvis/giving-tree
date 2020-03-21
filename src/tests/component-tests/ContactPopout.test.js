/*
useful links:
https://stackoverflow.com/questions/58843037/how-to-test-for-this-function-in-my-react-component-with-jest-and-enzyme

https://stackoverflow.com/questions/56639227/enzyme-unit-testing-onchange-method-using-material-ui-components/56639281#56639281
*/

import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

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
/*
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
*/
  it('it should exercise clickable state', () => {
    const mockCfData = "mockCfData";
    const mockNonprofitData = "mockNonprofitData";
    const component = enzyme.mount(<ContactPopout cfData={mockCfData} nonprofitData={mockNonprofitData} />)
    const popover = component.find(Popover);  
    expect(popover.props().anchorEl).toBe(null);
  
    const contactButton = component.find('#a-id');
    contactButton.props().onClick({event: { currentTarget: "true"}});
    expect(popover.props().anchorEl).toBeTruthy();

    contactButton.props().onClick({event: { currentTarget: "true"}});
    expect(popover.props().anchorEl).toBeFalsy();
    /*
    component
      .find("#a-id")
      .first()
      .simulate('onClick');
  
    expect(component.props().anchorEl).toBeFalsy();
    */
  });
})