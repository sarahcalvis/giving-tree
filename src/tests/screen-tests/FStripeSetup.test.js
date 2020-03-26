import React from 'react';
//import { shallow, mount } from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import FStripeSetup from '../../screens/FStripeSetup.js';

let mount;
let shallow;
beforeEach(() => {
  mount = createMount();
  shallow = createShallow();
});

describe('Links', () => {

  it('Renders correctly', () => {
    const wrap = shallow(<FStripeSetup />)
    expect(wrap).toMatchSnapshot();
  });

  it('Connect to Stripe link has correct address', () => {
    const wrap = mount(<FStripeSetup />)
    expect(wrap.find('ForwardRef(Link)').at(0).props().href).toEqual("https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GdKhmkaiFmOndJQ4UU6LTUm6pyfJcpQj&scope=read_write");
  });

  it('About link has correct address and opens new tab', () => {
    const wrap = mount(<FStripeSetup />)
    expect(wrap.find('ForwardRef(Link)').at(1).props().href).toEqual("https://stripe.com/about");
    expect(wrap.find('ForwardRef(Link)').at(1).props().target).toEqual('_blank');
  });

  
})

describe('Buttons', () => {
  it('They have proper text', () => {
    const wrap = mount(<FStripeSetup />)
    //console.log(wrap.find('ForwardRef(Button)').at(1).props())
    expect(wrap.find('ForwardRef(Button)').at(0).props().children).toEqual("Connect to Stripe");
    expect(wrap.find('ForwardRef(Button)').at(1).props().children).toEqual("Learn More");
    expect(wrap.find('ForwardRef(Button)').at(2).props().children).toEqual("Got it!");

    wrap.find('ForwardRef(IconButton)').at(0).simulate('click')
    expect(wrap.find('ForwardRef(Dialog)').at(0).props().open).toBeTruthy();

    wrap.find('ForwardRef(Button)').at(2).simulate('click')
    expect(wrap.find('ForwardRef(Dialog)').at(0).props().open).toBeFalsy();
  });

  it('The appropriate buttons open/close the dialog', () => {
    const wrap = mount(<FStripeSetup />)

    wrap.find('ForwardRef(IconButton)').at(0).simulate('click')
    expect(wrap.find('ForwardRef(Dialog)').at(0).props().open).toBeTruthy();

    wrap.find('ForwardRef(Button)').at(2).simulate('click')
    expect(wrap.find('ForwardRef(Dialog)').at(0).props().open).toBeFalsy();
  });
});