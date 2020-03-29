import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import FEditGrant from '../../screens/FEditGrant'

test('FEditGrant Basics', () => {
  render(<FEditGrant />)
  expect(screen).toMatchSnapshot();
});

test('Can upload a grant', () => {
  render(<FEditGrant />)

  // // fill out the form
  // fireEvent.change(screen.getByLabelText(/username/i), {
  //   target: {value: 'chuck'},
  // })
  // fireEvent.change(screen.getByLabelText(/password/i), {
  //   target: {value: 'norris'},
  // })

  // fireEvent.click(screen.getByText(/submit/i))
});

test('Can cancel new grant', () => {
  render(<FEditGrant />)
  fireEvent.click(screen.getByText('Save to Drafts'))

});