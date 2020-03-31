import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import FRequestDenied from '../../screens/NotFound'

test('Not Found Basics', () => {
  render(<FRequestDenied />)
  expect(screen).toMatchSnapshot();
});