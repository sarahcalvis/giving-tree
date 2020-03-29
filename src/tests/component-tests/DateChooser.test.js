import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import DateChooser from '../../components/DateChooser';

test('Date Chooser Basics', () => {
  const callback = (int, string) => { console.log(int, string) }
  render(<DateChooser
    callback={callback}
    date_deadline={{ seconds: 100 }} />)
  expect(screen).toMatchSnapshot();
});