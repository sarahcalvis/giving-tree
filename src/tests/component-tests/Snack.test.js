import React from 'react';
//import { shallow, mount } from 'enzyme';
import { Button, Menu, Typography, Backdrop } from "@material-ui/core";
import { createMount, createShallow } from '@material-ui/core/test-utils';

import Snack from '../../components/Snack.js';

let mount;
let shallow;
let wrap;

const snackProps = {
  message : "a lovely message",
}

beforeEach(() => {
  mount = createMount();
  shallow = createShallow();

  wrap = mount(<Snack {...snackProps}/>)
});

describe('Links', () => {

  it('Renders correctly', () => {
    expect(wrap).toMatchSnapshot();
  });
  
})

describe('Buttons', () => {
  it('They have proper text', () => {
    expect(wrap.find('ForwardRef(Button)').at(0).props().children).toEqual("Contact");
  });

  it('The appropriate buttons open/close the dialog', () => {
    expect(wrap.find('ForwardRef(Popover)').at(0).props().open).toBeFalsy();
    wrap.find('ForwardRef(Button)').at(0).simulate('click')
    expect(wrap.find('ForwardRef(Popover)').at(0).props().open).toBeTruthy();
  });

});