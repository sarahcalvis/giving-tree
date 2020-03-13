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
    const select = wrap.find('#select-radius');
    console.log("//////////////////////////////////////////////////");
    console.log("select: ", select);
    console.log("//////////////////////////////////////////////////");
    //wrapper.find(Component).at(index).simulate('click');
    //select.
    select.simulate('change', { target: { value: '10'} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0].toBe('10'));
    //select.simulate('keydown', { keyCode: 13 });
    //expect(wrap.find('SearchRadius').radius).toEqual(10);//('radius')).toEqual(10)
  });

  it('Select 25 miles', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SearchRadius parentCallback={onSelect} />)
    const select = wrap.find('#select-radius').hostNodes();
    select.simulate('change', { target: { value: '25'} });
    //select.simulate('keydown', { keyCode: 13 });
    expect(wrap.find('SearchRadius').radius).toEqual(25)
  });

  it('Select 50 miles', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SearchRadius parentCallback={onSelect} />)
    const select = wrap.find('#select-radius').hostNodes();
    select.simulate('change', { target: { value: '50'} });
    //select.simulate('keydown', { keyCode: 13 });
    expect(wrap.find('SearchRadius').radius).toEqual(50)
  });

  it('Select 100 miles', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<SearchRadius parentCallback={onSelect} />)
    const select = wrap.find('#select-radius').hostNodes();
    select.simulate('change', { target: { value: '100'} });
    //select.simulate('keydown', { keyCode: 13 });
    expect(wrap.find('SearchRadius').radius).toEqual(100)
  });

})