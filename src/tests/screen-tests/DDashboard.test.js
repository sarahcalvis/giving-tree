import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import DDashboard from '../../screens/DDashboard'

test('DDashboard Basics', () => {
  jest.mock('react-router', () => ({
    useParams: jest.fn().mockReturnValue({ id: '123' }),
  }));
  
  render(<DDashboard />)
  expect(screen).toMatchSnapshot();
});