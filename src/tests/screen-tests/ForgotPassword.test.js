import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthUserContext from '../../auth/context.js';

import {firestore as FIRESTORE} from "firebase/app";

import ForgotPassword from '../../screens/ForgotPassword.js';
import { ForgotPasswordFormBase, SignInSignUpLink } from '../../screens/ForgotPassword.js';
import { StaticRouter } from 'react-router-dom';

import { createMount } from '@material-ui/core/test-utils';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';


function MockTheme({ children }) {
  const theme = createMuiTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe('ForgotPassword', () => {

  let wrap;

  beforeEach(() => {
    wrap = mount(
      <StaticRouter>
        <ForgotPassword/>
      </StaticRouter>
      
    )
  });

  it('Renders correctly', () => {  
    expect(wrap).toMatchSnapshot();
  });

})


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