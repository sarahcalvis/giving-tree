import '@testing-library/jest-dom'
import React from 'react'
import { shallow } from 'enzyme';

import LargeGrantCard from '../../components/LargeGrantCard'

const routeComponentPropsMock = {
  // add jest.fn() as needed to any of the objects
  history: {},
  location: {},
  match: {}
}

let wrap;
let inst;

beforeEach(() => {
  sessionStorage.clear();
  wrap = shallow(<LargeGrantCard {...routeComponentPropsMock} />)
  inst = wrap.instance();
})


describe('Large Grant Card basics', () => {

  it('Renders correctly', () => {
    const wrap = shallow(<LargeGrantCard img={['hiya']} tags={['hiya']} />)
    
    expect(wrap).toMatchSnapshot();
  });
  
})