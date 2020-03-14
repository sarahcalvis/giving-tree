import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SortBy from "../../components/SortBy.js";

describe('Component: SortBy', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SortBy parentCallback={onSelect} />)
    expect(wrap).toMatchSnapshot();
  });

  it('Sort by deadline', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SortBy parentCallback={onSelect} />)
    const select = wrap.find('#select-sort').at(0);
    select.props().onChange({ target: { value: "deadline"} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe("deadline");
  });

  it('Sort by posting date', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SortBy parentCallback={onSelect} />)
    const select = wrap.find('#select-sort').at(0);
    select.props().onChange({ target: { value: "posting"} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe("posting");
  });

  it('Sort by goal decreasing', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SortBy parentCallback={onSelect} />)
    const select = wrap.find('#select-sort').at(0);
    select.props().onChange({ target: { value: "goalD"} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe("goalD");
  });

  it('Sort by goal increasing', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SortBy parentCallback={onSelect} />)
    const select = wrap.find('#select-sort').at(0);
    select.props().onChange({ target: { value: "goalI"} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe("goalI");
  });

  it('Sort by size', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SortBy parentCallback={onSelect} />)
    const select = wrap.find('#select-sort').at(0);
    select.props().onChange({ target: { value: "size"} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe("size");
  });

})