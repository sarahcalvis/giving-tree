/*
import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EditGrant from "../../components/EditGrant.js";

describe('Component: EditGrant', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const mockCallback = jest.fn();
    const mockErrors = [];
    const mockCfId = "";
    const mockGrantData = {
        dist: -1,
        id: "",
        title: "",
        cfName: "",
        nonprofitName: "",
        goalAmt: "",
        moneyRaised: "",
        img: 'GivingTree.png',
        nonprofitId: "",
        address: "",
        lat: "",
        long: "",
        datePosted: "",
        dateDeadline: "",
        desc: "",
        tags: [""]
      };
    const wrap = enzyme.mount(<EditGrant grantData={mockGrantData} cfId={mockCfId} callback={mockCallback} errors={mockErrors} />)
    expect(wrap).toMatchSnapshot();
  });

})
*/