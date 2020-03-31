import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
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