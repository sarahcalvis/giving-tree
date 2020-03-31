import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, MemoryRouter } from 'react-router';
import { StaticRouter } from 'react-router-dom';

import ForgotPassword from '../../screens/ForgotPassword.js';

const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection, mockWhere } = require('firestore-jest-mock/mocks/firestore');

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
