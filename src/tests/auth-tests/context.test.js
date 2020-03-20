
import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AuthUserContext from "../../auth/context.js";

describe('Component: AuthUserContext', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const props = {
        pic: '../../iconSmall.png', 
        stuff: "more stuff"
    };
    const authUser = "?";
    const wrap = enzyme.shallow(<AuthUserContext props={props} authUser={authUser}/>)
    expect(wrap).toMatchSnapshot();
  });

})
