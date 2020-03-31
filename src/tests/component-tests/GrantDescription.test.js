import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from 'enzyme';
import GrantDescription from '../../components/GrantDescription'

test('Grant Description Basics', () => {
  render(<GrantDescription />)
  expect(screen).toMatchSnapshot();
});

test('Grant Description renders a text field when there is no default text', () => {
  let onChange = jest.fn();

  const wrapper = mount(<GrantDescription
    error={false}
    helperText={''}
    defaultValue={''}
    onChange={onChange} />);

  expect(wrapper.find('desc')).toBeDefined();
});