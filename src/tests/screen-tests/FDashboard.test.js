import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { shallow, mount } from 'enzyme';
import FDashboard from '../../screens/FDashboard'

const routeComponentPropsMock = {
  history: {},
  location: {
    search: 'hiya'
  },
  match: {grantId: '123' }
}

test('FDashboard Basics', () => {
  render(<FDashboard {...routeComponentPropsMock} />)
  expect(screen).toMatchSnapshot();
});

// current drafted expired id=toggle onChange=handleToggle
// change toggle val

describe('FDashboard toggle tests', () => {
  it('toggles correctly', () => {
    const wrap = mount(<FDashboard{...routeComponentPropsMock} />)
    expect(wrap).toMatchSnapshot();
    wrap.find("#toggle").onChange({event:"", status: "drafted"});
    expect(wrap).find("")
  })

});