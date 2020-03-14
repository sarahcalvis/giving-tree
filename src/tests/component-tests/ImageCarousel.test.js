
import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ImageCarousel from "../../components/ImageCarousel.js";

describe('Component: ImageCarousel', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const mockImg = '../../iconSmall.png';
    
    const wrap = enzyme.mount(<ImageCarousel img={mockImg}/>)
    expect(wrap).toMatchSnapshot();
  });

})
