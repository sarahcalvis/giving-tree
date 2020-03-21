import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, MemoryRouter } from 'react-router';
import { StaticRouter } from 'react-router-dom';

import SignIn from '../../screens/SignIn.js';

describe('SignIn with no props', () => {
  const context = {};
  const container = mount(
    <StaticRouter location="someLocation" context={context}>
        <SignIn />
    </StaticRouter>);

  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });

  it('should have an email field', () => {
    expect(container.find('#email').at(0).length).toEqual(1);
  });

  it('should have proper props for email field', () => {
    expect(container.find('#email').at(0).props()).toEqual({
      variant: "outlined",
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "email",
      onChange: expect.any(Function),
      type: "text",
      label: "Email Address",
      autoFocus: true,
      error: false,
      helperText: "",
      id: "email",
      value: "", 
    });
  });

});