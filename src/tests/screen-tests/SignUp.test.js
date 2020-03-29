import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, MemoryRouter } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import firebase from '../../firebase.js';

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
      error: false,
      variant: "outlined",
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "passwordOne",
      onChange: expect.any(Function),
      type: "password",
      label: "Password",
      id: "passwordOne",
      helperText: "",
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
  let context, container;

  beforeEach(() => {
    context = {};
    container = mount(
      <StaticRouter location="someLocation" context={context}>
        <SignUp />
      </StaticRouter>);
  });

  it('should set the email value on change event', () => {
    container.find('#email').at(0).props().onChange({
      target: {
        name: 'email',
        value: 'acesmndr@gmail.com',
      },
    });
    expect(container.find('#email').at(0).length).toEqual(1);
    expect(container.find('SignUpFormBase').state()).toEqual({
      "email": 'acesmndr@gmail.com',
      "errors": {
        "email": "",
        "passwordOne": "",
        "passwordTwo": "",
        "submit": "",
      },
      "isValid": false,
      "passwordOne": '',
      "passwordTwo": ''
    });
  });

  it('should set the password value on change event', () => {
    container.find('#passwordOne').at(0).props().onChange({
      target: {
        name: 'passwordOne',
        value: 'notapassword',
      },
    });
    expect(container.find('#passwordOne').at(0).length).toEqual(1);
    expect(container.find('SignUpFormBase').state()).toEqual({
      "email": "",
      "errors": {
        "email": "",
        "passwordOne": "*Password fails the following requirements: a number, an uppercase letter, a special character (e.g. !@#$%^&*)",
        "passwordTwo": "",
        "submit": "",
      },
      "isValid": false,
      "passwordOne": 'notapassword',
      "passwordTwo": ''
    });

  });

  it('should set the password check value on change event', () => {
    container.find('#passwordTwo').at(0).props().onChange({
      target: {
        name: 'passwordTwo',
        value: 'notapassword',
      },
    });
    expect(container.find('#passwordTwo').at(0).length).toEqual(1);
    expect(container.find('SignUpFormBase').state()).toEqual({
      "email": "",
      "errors": {
        "email": "",
        "passwordOne": "",
        "passwordTwo": "*Passwords do not match.",
        "submit": "",
      },
      "isValid": false,
      "passwordOne": '',
      "passwordTwo": 'notapassword'
    });

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
    let context, container;
  
    beforeEach(() => {
      context = {};
      container = mount(
        <StaticRouter location="someLocation" context={context}>
          <SignUp />
        </StaticRouter>);
        firebase.auth = jest.fn().mockReturnValue({
          createUserWithEmailAndPassword: function(email, passwordOne) { return true; }
          });
    });
  
    it('should allow submit when given correct input', () => {
      container.find('#email').at(0).props().onChange({
        target: {
          name: 'email',
          value: 'acesmndr@gmail.com',
        },
      });
      expect(container.find('#email').at(0).length).toEqual(1);
      
      container.find('#passwordOne').at(0).props().onChange({
        target: {
          name: 'passwordOne',
          value: '1q!Q1q!q',
        },
      });
      expect(container.find('#passwordOne').at(0).length).toEqual(1);
      
      container.find('#passwordTwo').at(0).props().onChange({
        target: {
          name: 'passwordTwo',
          value: '1q!Q1q!q',
        },
      });
      expect(container.find('#passwordTwo').at(0).length).toEqual(1);
      
      expect(container.find('SignUpFormBase').state()).toEqual({
        "email": "acesmndr@gmail.com",
        "errors": {
          "email": "",
          "passwordOne": "",
          "passwordTwo": "",
          "submit": "",
        },
        "isValid": true,
        "passwordOne": '1q!Q1q!q',
        "passwordTwo": '1q!Q1q!q'
      });
      
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

      //let result = container.onSubmit();
      //expect(result).toBe(true);
    });
  });