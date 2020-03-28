import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import FEditGrant from '../../screens/FEditGrant'

test('FEditGrant Basics', () => {
  render(<FEditGrant/>)
  expect(screen).toMatchSnapshot();
})