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

  it('should have a password field', () => {
    expect(container.find('#password').at(0).length).toEqual(1);
  });

  it('should have proper props for password field', () => {
    expect(container.find('#password').at(0).props()).toEqual({
      variant: "outlined",
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "password",
      onChange: expect.any(Function),
      type: "password",
      label: "Password",
      id: "password",
      value: "", 
    });
  });

  it('should have a submit button', () => {
    expect(container.find('#submit-button').at(0).length).toEqual(1);
  });

  it('should have proper props for the submit button', () => {
    expect(container.find('#submit-button').at(0).props()).toEqual({
      variant: "contained",
      children: "Sign In",
      className: "SignIn-submit-4",
      color: "primary",
      disabled: true,
      fullWidth: true,
      type: "submit",
      id: "submit-button",
    });
  });

});

describe('SignIn with props', () => {
    const context = {};
    const container = mount(
      <StaticRouter location="someLocation" context={context}>
          <SignIn/>
      </StaticRouter>);

    it('should set the email value on change event', () => {
        container.find('#email').at(0).simulate('change', {
            target: {
                name: 'email',
                value: 'acesmndr@gmail.com',
            },
        });
        container.update();
        expect(container.find('#email').at(0).prop('value')).toEqual(
            'acesmndr@gmail.com',
        );
    });  

    it('should set the password value on change event', () => {
        container.find('#password').at(0).simulate('change', {
          target: {
            name: 'password',
            value: 'notapassword',
          },
        });
        container.update()
        expect(container.find('#password').at(0).prop('value')).toEqual(
          'notapassword',
        );
      });
    
    it('should have proper props for the submit button', () => {
      expect(container.find('#submit-button').at(0).props()).toEqual({
        variant: "contained",
        children: "Sign In",
        className: "SignIn-submit-4",
        color: "primary",
        disabled: true,
        fullWidth: true,
        type: "submit",
        id: "submit-button",
      });
    });
  
  });