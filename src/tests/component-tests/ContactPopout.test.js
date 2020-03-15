import React from 'react';
//import { shallow, mount } from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import ContactPopout from '../../components/ContactPopout.js';

let mount;
let shallow;
let wrap;

const grantProps = {
  cfData : {
    url: 'www.cf.com',
    name: 'I am CF',
    phone: '5554443333',
    public_phone: '1112223333',
    public_email: 'yada@blah.net',
    email: 'foo@bar.io'
  },
  nonprofitData : {
    url: 'www.np.gov',
    name: 'I am not for profit',
    phone: '9998887777',
    public_phone: '2227776666',
    public_email: 'gah@buh.com',
    email: 'aaaiii@killme.please'
  }
}

beforeEach(() => {
  mount = createMount();
  shallow = createShallow();

  wrap = mount(<ContactPopout {...grantProps}/>)
});

describe('Links', () => {

  it('Renders correctly', () => {
    expect(wrap).toMatchSnapshot();
  });

  /*it('Connect to Stripe link has correct address', () => {
    const wrap = mount(<ContactPopout />)
    expect(wrap.find('ForwardRef(Link)').at(0).props().href).toEqual("https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GdKhmkaiFmOndJQ4UU6LTUm6pyfJcpQj&scope=read_write");
  });

  it('About link has correct address and opens new tab', () => {
    const wrap = mount(<ContactPopout />)
    expect(wrap.find('ForwardRef(Link)').at(1).props().href).toEqual("https://stripe.com/about");
    expect(wrap.find('ForwardRef(Link)').at(1).props().target).toEqual('_blank');
  });*/

  
})

describe('Buttons', () => {
  it('They have proper text', () => {
    expect(wrap.find('ForwardRef(Button)').at(0).props().children).toEqual("Contact");
  });

  it('The appropriate buttons open/close the dialog', () => {
    wrap.find('ForwardRef(Button)').at(0).simulate('click')
    expect(wrap.find('ForwardRef(Popover)').at(0).props().open).toBeTruthy();
  });
});