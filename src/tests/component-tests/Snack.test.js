import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import Snack from '../../components/Snack'

test('Snack Basics', () => {
  render(<Snack />)
  expect(screen).toMatchSnapshot();
});