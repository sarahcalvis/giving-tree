import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ContactPopout from "../../components/ContactPopout.js";

describe('Component: ContactPopout', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<ContactPopout parentCallback={onSelect} />)
    expect(wrap).toMatchSnapshot();
  });

  it('Sort by posting date', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<ContactPopout parentCallback={onSelect} />)
    const select = wrap.find('#select-sort').at(0);
    select.props().onChange({ target: { value: "posting"} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe("posting");
  });

})