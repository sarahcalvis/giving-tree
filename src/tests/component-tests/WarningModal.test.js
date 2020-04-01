import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import WarningModal from '../../components/WarningModal'

test('Warning Modal Basics', () => {
  render(<WarningModal />)
  expect(screen).toMatchSnapshot();
});

test('Warning Modal checks for correct CF name', () => {
  render(<WarningModal cfName={'name'} />)
})