import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, MemoryRouter } from 'react-router';
import { StaticRouter } from 'react-router-dom';

import SignUp from '../../screens/SignUp.js';

describe('SignUp with no props', () => {
  const context = {};
  const container = mount(
    <StaticRouter location="someLocation" context={context}>
        <SignUp />
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

  it('should have a passwordOne field', () => {
    expect(container.find('#passwordOne').at(0).length).toEqual(1);
  });

  it('should have proper props for passwordOne field', () => {
    expect(container.find('#passwordOne').at(0).props()).toEqual({
      variant: "outlined",
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "passwordOne",
      onChange: expect.any(Function),
      type: "password",
      label: "Password",
      id: "password",
      value: "", 
    });
  });

  it('should have a passwordConfimrm field', () => {
    expect(container.find('#passwordTwo').at(0).length).toEqual(1);
  });

  it('should have proper props for passwordTwo field', () => {
    expect(container.find('#passwordTwo').at(0).props()).toEqual({
      error: false,
      helperText: "",
      variant: "outlined",
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "passwordTwo",
      onChange: expect.any(Function),
      type: "password",
      label: "Confirm Password",
      id: "passwordTwo",
      value: "", 
    });
  });

  it('should have a submit button', () => {
    expect(container.find('#submit-button').at(0).length).toEqual(1);
  });

  it('should have proper props for the submit button', () => {
    expect(container.find('#submit-button').at(0).props()).toEqual({
      variant: "contained",
      children: "Sign Up",
      className: "SignUp-submit-4",
      color: "primary",
      disabled: true,
      fullWidth: true,
      type: "submit",
      id: "submit-button",
    });
  });

});

describe('SignUp with props', () => {
    const context = {};
    const container = mount(
      <StaticRouter location="someLocation" context={context}>
          <SignUp/>
      </StaticRouter>);
    
    it('should have proper props for the submit button', () => {
      expect(container.find('#submit-button').at(0).props()).toEqual({
        variant: "contained",
        children: "Sign Up",
        className: "SignUp-submit-4",
        color: "primary",
        disabled: true,
        fullWidth: true,
        type: "submit",
        id: "submit-button",
      });
    });
  
  });