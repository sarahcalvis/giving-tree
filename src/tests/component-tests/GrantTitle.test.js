import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { mount } from 'enzyme';
import GrantTitle from '../../components/GrantTitle'

test('Grant Title Basics', () => {
  render(<GrantTitle />)
  expect(screen).toMatchSnapshot();
});

test('Grant Title renders a text field when there is no default text', () => {
  let onChange = jest.fn();

  const wrapper = mount(<GrantTitle
    error={false}
    helperText={''}
    defaultValue={''}
    onChange={onChange} />);

  expect(wrapper.find('title')).toBeDefined();
});