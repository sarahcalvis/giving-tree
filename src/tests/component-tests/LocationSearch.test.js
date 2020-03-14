/*
helpful links:
https://www.npmjs.com/package/jest-googleapi-mock
https://stackoverflow.com/questions/60334129/react-testing-with-jest-and-enzyme-react-google-maps-api-returns-typeerror-can
https://janmonschke.com/projects/geomock.html
*/

import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createGoogleMapsMock from 'jest-google-maps-mock';
 
import LocationSearch from "../../components/LocationSearch.js";

describe('Component: LocationSearch', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });
  let googleMaps;
 
  beforeEach(() => {
    googleMaps = createGoogleMapsMock();
  });
 
  it('should create a map mock', () => {
    const mapDiv = document.createElement('div');
    new googleMaps.Map(mapDiv);
 
    expect(googleMaps.Map).toHaveBeenCalledTimes(1);
    expect(googleMaps.Map.mock.instances.length).toBe(1);
    expect(googleMaps.Map).toHaveBeenLastCalledWith(mapDiv);
  });

  it('Renders correctly', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<LocationSearch parentCallback={onSelect} />)
    expect(wrap).toMatchSnapshot();
  });

  it('Sort by deadline', () => {
    const onSelect = jest.fn();
    const wrap = enzyme.mount(<LocationSearch parentCallback={onSelect} />)
    const select = wrap.find('#select-sort').at(0);
    select.props().onChange({ target: { value: "deadline"} });
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe("deadline");
  });

})