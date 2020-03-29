import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from 'enzyme';
import DateChooser from '../../components/DateChooser';

test('Date Chooser Basics', () => {
  const callback = (int, string) => { console.log(int, string) }
  render(<DateChooser
    callback={callback}
    date_deadline={{ seconds: 100 }} />)
  expect(screen).toMatchSnapshot();
});

// test('Grant Description renders a text field when there is no default text', () => {
//   let onChange = jest.fn();

//   const wrapper = mount(<GrantDescription
//     error={false}
//     helperText={''}
//     defaultValue={''}
//     onChange={onChange} />);

//   expect(wrapper.find('desc')).toBeDefined();
// });