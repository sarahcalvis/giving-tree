import React from 'react';
import { shallow } from 'enzyme';
import SignIn from '../../screens/SignIn.js';

describe('SignIn with no props', () => {
  const container = shallow(<SignIn />);

  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });

  it('should have an email field', () => {
    expect(container.find('TextField[type="email"]').length).toEqual(1);
  });

  it('should have proper props for email field', () => {
    expect(container.find('TextField[type="email"]').props()).toEqual({
      variant: "outlined",
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "email",
      onChange: expect.any(Function),
      type: "text",
      label: "Email Address",
      autoFocus: true,
    });
  });

});