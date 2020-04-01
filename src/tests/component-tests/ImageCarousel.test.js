
import React from "react";
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ImageCarousel from "../../components/ImageCarousel.js";

describe('Image Carousel basics', () => {

  it('Renders correctly', () => {
    const wrap = shallow(<ImageCarousel img={['https://cdnph.upi.com/svc/sv/upi/7831555016823/2019/1/2a2f8d30859d917bc612eea8c6343b2e/Ohio-Gov-DeWine-signs-heartbeat-abortion-bill.jpg']} />)
    
    expect(wrap).toMatchSnapshot();
  });
  
})

describe('Component: ImageCarousel', () => {
  var enzyme = require('enzyme');
  enzyme.configure({ adapter: new Adapter() });

  it('Renders correctly', () => {
    const mockImg = '../../iconSmall.png';
    
    const wrap = enzyme.mount(<ImageCarousel img={mockImg}/>)
    expect(wrap).toMatchSnapshot();
  });

})
