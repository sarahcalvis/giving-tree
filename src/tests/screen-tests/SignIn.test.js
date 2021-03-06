import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, MemoryRouter } from 'react-router';
import { StaticRouter } from 'react-router-dom';

import SignIn from '../../screens/SignIn.js';

const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection, mockWhere } = require('firestore-jest-mock/mocks/firestore');

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
  let context, container;

  beforeEach(() => {
    context = {};
    container = mount(
      <StaticRouter location="someLocation" context={context}>
        <SignIn />
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
    expect(container.find('SignInFormBase').state()).toEqual({
      "email": 'acesmndr@gmail.com',
      "errors": {
        "email": "",
        "submit": "",
      },
      "isValid": false,
      "password": ''
    });
  });

  it('should set the password value on change event', () => {
    container.find('#password').at(0).props().onChange({
      target: {
        name: 'password',
        value: 'notapassword',
      },
    });
    expect(container.find('#password').at(0).length).toEqual(1);
    expect(container.find('SignInFormBase').state()).toEqual({
      "email": "",
      "errors": {
        "email": "",
        "submit": "",
      },
      "isValid": false,
      "password": 'notapassword'
    });

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

describe('SignIn submitting corret props', () => {

  mockFirebase({
    database: {
      users: [
        { email : "",
          name : "",
         },
      ],
    },
  });

  let firebase;
  let db;

  beforeEach(() => {
    firebase = require('firebase');
    db = firebase.firestore();
  });
  let context, container;

  beforeEach(() => {
    context = {};
    container = mount(
      <StaticRouter location="someLocation" context={context}>
        <SignIn />
      </StaticRouter>);
  });

  it('should allow user to sign in', () => {
    container.find('#email').at(0).props().onChange({
      target: {
        name: 'email',
        value: 'acesmndr@gmail.com',
      },
    });
    expect(container.find('#email').at(0).length).toEqual(1);
    
    container.find('#password').at(0).props().onChange({
      target: {
        name: 'password',
        value: '1q!Q1q!Q',
      },
    });
    expect(container.find('#password').at(0).length).toEqual(1);
    expect(container.find('SignInFormBase').state()).toEqual({
      "email": "acesmndr@gmail.com",
      "errors": {
        "email": "",
        "submit": "",
      },
      "isValid": true,
      "password": '1q!Q1q!Q'
    });
  });

});