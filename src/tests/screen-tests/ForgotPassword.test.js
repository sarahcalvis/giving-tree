import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthUserContext from '../../auth/context.js';

import {firestore as FIRESTORE} from "firebase/app";

import ForgotPassword from '../../screens/ForgotPassword.js';
import { ForgotPasswordFormBase, SignInSignUpLink } from '../../screens/ForgotPassword.js';
import { Link, MemoryRouter } from 'react-router';
import { StaticRouter } from 'react-router-dom';

import { createMount } from '@material-ui/core/test-utils';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection, mockWhere } = require('firestore-jest-mock/mocks/firestore');


function MockTheme({ children }) {
  const theme = createMuiTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}


describe('ForgotPasswordForm', () => {
  
  let wrap;
  let mount;

  const error = {message: 'It went wrong!'};
  const firebase = {
    auth : function() {
      return {sendPasswordResetEmail: function(email) {
        console.log(email+' got passed');
        return {then: function(callback) {
          callback();
          return {catch: function(callback) {
            callback(error);
            return "catch successful"
          }}
        }}
      }};
    }
  };


  const props = {
    classes: {
      root: "ForgotPassword-root-519",
      avatar: "ForgotPassword-avatar-520",
      form: "ForgotPassword-form-521",
      submit: "ForgotPassword-submit-522",
      links: "ForgotPassword-links-523",
      errorMsg: "ForgotPassword-errorMsg-524"
    }
  }

  const mockedEvent = { target: {name: 'bah', value: 'fug'} }

  beforeEach(() => {
    mount = createMount();
    wrap = shallow(
      <ForgotPasswordFormBase {...props}/>
    );
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('Updates with onChange correctly', () => {    
    wrap.find("WithStyles(ForwardRef(TextField))").simulate('change', mockedEvent)
    expect(wrap.state('errors')).toEqual({ email: '', submit: '', bah: '' })
  });
  
  it('Updates with validateForm correctly', () => {  
    wrap.find("WithStyles(ForwardRef(TextField))").simulate('change', mockedEvent)
    expect(wrap.state('isValid')).toBeFalsy()
  });

  it('Uses with onSubmit correctly (failure)', () => {  
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    wrap.setState({isValid: true});
    const inst = wrap.instance();
    inst.onSubmit(fakeEvent);
    expect(wrap.state('success')).toBeFalsy()
  });

  it('Uses with onSubmit correctly (success)', () => {  
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    const inst = wrap.instance();
    wrap.setState({isValid: 'blah@yada.net'});
    wrap.setState({isValid: true});
    inst.onSubmit(fakeEvent, firebase);
    expect(wrap.state('success')).toBeTruthy();
    expect(wrap.state('errors').submit).toEqual('It went wrong!');
  });
});


describe('ForgotPassword with no props', () => {
  const context = {};
  const container = mount(
    <StaticRouter location="someLocation" context={context}>
      <ForgotPassword />
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

  it('should have a submit button', () => {
    expect(container.find('#submit-button').at(0).length).toEqual(1);
  });

  it('should have proper props for the submit button', () => {
    expect(container.find('#submit-button').at(0).props()).toEqual({
      variant: "contained",
      children: "Reset Password",
      className: "ForgotPassword-submit-4",
      color: "primary",
      disabled: true,
      fullWidth: true,
      type: "submit",
      id: "submit-button",
    });
  });
});


describe('ForgotPassword with props', () => {
  let context, container;

  beforeEach(() => {
    context = {};
    container = mount(
      <StaticRouter location="someLocation" context={context}>
        <ForgotPassword />
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
    expect(container.find('ForgotPasswordFormBase').state()).toEqual({
      "email": 'acesmndr@gmail.com',
      "errors": {
        "email": "",
        "submit": "",
      },
      "isValid": true,
      "success": false
    });
  });

  it('should have proper props for the submit button', () => {
    expect(container.find('#submit-button').at(0).props()).toEqual({
      variant: "contained",
      children: "Reset Password",
      className: "ForgotPassword-submit-4",
      color: "primary",
      disabled: true,
      fullWidth: true,
      type: "submit",
      id: "submit-button",
    });
  });

});


describe('SigninSignupLink', () => {
  
  let wrap;
  
  beforeEach(() => {
    wrap = shallow(
        <SignInSignUpLink/>
    )
  });

  it('Renders correctly', () => {  
    expect(wrap).toMatchSnapshot();
  });

});

