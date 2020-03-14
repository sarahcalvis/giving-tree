/*
import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FoundationCard from "../../components/FoundationCard.js";

describe('Component: FoundationCard', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const approveCB = jest.fn();
    const denyCB = jest.fn();
    const deleteCB = jest.fn();
    const mockData = {
        name : "",
        public_email: "",
        public_phone: "",
        personal_email: "",
        personal_phone: "",
        foundation_url: "",
        fname_contact: "",
        lname_contact: "",
        status: "",
        date_requested: Date.now(),
        date_approved: Date.now(),
        date_denied: Date.now(),
        date_deactivated: Date.now(),
      }
    const wrap = enzyme.mount(<FoundationCard approveCB={approveCB} denyCB={denyCB} deleteCB={deleteCB} data={mockData}/>)
    expect(wrap).toMatchSnapshot();
  });

})

*/