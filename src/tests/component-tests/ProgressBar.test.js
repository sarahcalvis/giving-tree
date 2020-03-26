import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProgressBar from "../../components/ProgressBar.js";

describe('Component: ProgressBar', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => { 
    const wrap = enzyme.mount(<ProgressBar raised={100} goal={1000} />)
    expect(wrap).toMatchSnapshot();
  });

  it('update progress bar amount donated', () => {
    const wrap = enzyme.mount(<ProgressBar raised={100} goal={1000} />)
    const progress = wrap.find('#lin-prog').at(0);
    expect(progress.props().value).toBe(10.0);
  });
  
})