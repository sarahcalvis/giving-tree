import '@testing-library/jest-dom'
import React from 'react'
import { shallow } from 'enzyme';

import SmallGrantCard from '../../components/SmallGrantCard'

const routeComponentPropsMock = {
  history: {},
  location: {},
  match: {}
}

describe('Small Grant Card basics', () => {

  it('Renders correctly', () => {
    // const wrap = shallow(<SmallGrantCard  {...routeComponentPropsMock} />)

    // expect(wrap).toMatchSnapshot();
  });

})

