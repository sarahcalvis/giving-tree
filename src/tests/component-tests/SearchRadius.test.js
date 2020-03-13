import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchRadius from "../../components/SearchRadius.js";

describe('Component: SearchRadius', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SearchRadius parentCallback={onSelect} />)
    expect(wrap).toMatchSnapshot();
  });

  it('Select 10 miles', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SearchRadius parentCallback={onSelect} />)
    const select = wrap.find('#select-radius').at(0);
    //console.log("select: ", select.debug());
    select.props().onChange({ target: { value: 10} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe(10);
  });

  it('Select 25 miles', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SearchRadius parentCallback={onSelect} />)
    const select = wrap.find('#select-radius').at(0);
    //console.log("select: ", select.debug());
    select.props().onChange({ target: { value: 25} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe(25);
  });
  it('Select 50 miles', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SearchRadius parentCallback={onSelect} />)
    const select = wrap.find('#select-radius').at(0);
    //console.log("select: ", select.debug());
    select.props().onChange({ target: { value: 50} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe(50);
  });
  it('Select 100 miles', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SearchRadius parentCallback={onSelect} />)
    const select = wrap.find('#select-radius').at(0);
    //console.log("select: ", select.debug());
    select.props().onChange({ target: { value: 100} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe(100);
  });

})