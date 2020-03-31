import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import FRequestDenied from '../../screens/FRequestDenied'
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

test('FRequestDenied Basics', () => {
  render(
    <MemoryRouter {...routeComponentPropsMock} >
      <FRequestDenied />
    </MemoryRouter>)
  expect(screen).toMatchSnapshot();
});