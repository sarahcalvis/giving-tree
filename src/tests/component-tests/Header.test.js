import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthUserContext from '../../auth/context.js';

import FSettings from '../../screens/FSettings.js';
import {firestore as FIRESTORE} from "firebase/app";
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../../components/Header.js';

import { createMemoryHistory } from 'history'
import { jssPreset } from '@material-ui/core';


const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection, mockWhere } = require('firestore-jest-mock/mocks/firestore');



describe('Header logged out', () => {
  let wrap;

  beforeEach(() => {
    wrap = mount(
      <MemoryRouter >
        <Header />
      </MemoryRouter> 
    )
  });

  it('Renders correctly', () => {  
    expect(wrap).toMatchSnapshot();
  });

  it('Opens menu', () => {  
    expect(wrap.find("WithStyles(ForwardRef(Menu))").at(0).props().open).toBeFalsy();
    wrap.find("WithStyles(ForwardRef(IconButton))").at(1).simulate('click');
    expect(wrap.find("WithStyles(ForwardRef(Menu))").at(0).props().open).toBeTruthy();
  });

  it('Closes menu', () => { 
    const history = {
      push : jest.fn()
    }

    wrap = mount(
      <MemoryRouter >
        <Header 
          history = {history}
        />
      </MemoryRouter> 
    )

    wrap.find("WithStyles(ForwardRef(IconButton))").at(1).simulate('click');
    wrap.find("WithStyles(ForwardRef(Menu))").at(0).find("SignedOut").find("WithStyles(ForwardRef(MenuItem))").simulate('click');
    expect(history.push.mock.calls[0][0]).toEqual('/signin');
  });

})


describe('Header logged in', () => {
  const authUser = {
    cfId: "1fbyawFlFR0YdMYPZbtG",
    status: "current",
    iss: "https://securetoken.google.com/givingtree-cfs",
    aud: "givingtree-cfs",
    auth_time: 1585185093,
    user_id: "QJbnn1tU1EUCnllEGBAW4ZuLMG42",
    sub: "QJbnn1tU1EUCnllEGBAW4ZuLMG42",
    iat: 1585437646,
    exp: 1585441246,
    email: "sprechernd1@gcc.edu",
    email_verified: false,
    firebase: {
      identities: {
        email: ["sprechernd1@gcc.edu"]
      },
      sign_in_provider: "password"
    }
  }

  it('goes to Profile from menu', () => { 
    const history = {
      push : jest.fn()
    }

    let wrap = mount(
      <MemoryRouter >
        <Header 
          history = {history}
          authUser={authUser}
        />
      </MemoryRouter> 
    )
    wrap.find("WithStyles(ForwardRef(IconButton))").at(1).simulate('click');
    expect(wrap.find("WithStyles(ForwardRef(Menu))").at(0).props().anchorEl).not.toBeFalsy();
    wrap.find("WithStyles(ForwardRef(Menu))").at(0).find("SignedIn").find("WithStyles(ForwardRef(MenuItem))").at(0).simulate('click');
    expect(wrap.find("WithStyles(ForwardRef(Menu))").at(0).props().anchorEl).toBeFalsy();
  });

  it('Logs out from menu', () => { 
    const history = {
      push : jest.fn()
    }

    let wrap = mount(
      <MemoryRouter >
        <Header 
          history = {history}
          authUser={authUser}
        />
      </MemoryRouter> 
    )
    wrap.find("WithStyles(ForwardRef(IconButton))").at(1).simulate('click');
    wrap.find("WithStyles(ForwardRef(Menu))").at(0).find("SignedIn").find("WithStyles(ForwardRef(MenuItem))").at(1).simulate('click');
    expect(wrap.find("WithStyles(ForwardRef(Menu))").at(0).props().anchorEl).toBeFalsy();
  });

});

