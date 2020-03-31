import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import FRequestSent from '../../screens/FRequestSent'
import { MemoryRouter } from 'react-router-dom';

const routeComponentPropsMock = {
  history: {
    listen: jest.fn(),
  },
  location: {
    pathname: '/foundation/grant'
  },
  match: {},
}

test('FRequestSent Basics', () => {
  render(
    <MemoryRouter {...routeComponentPropsMock} >
      <FRequestSent />
    </MemoryRouter>)
  expect(screen).toMatchSnapshot();
});