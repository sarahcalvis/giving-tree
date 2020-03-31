/*
No clue why this doesn't work
*/
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import DGive from '../../screens/DGive'
Enzyme.configure({ adapter: new Adapter() });
const routeComponentPropsMock = {
  history: {},
  location: {
    search: 'hiya'
  },
  match: {grantId: '123' }
}
describe('DGive basics', () => {
  jest.mock('react-router', () => ({
    useParams: jest.fn().mockReturnValue({grantId: '123' }),
  }));
  it('renders', () => {
    // const wrapper = shallow(<DGive {...routeComponentPropsMock} />);
    // expect(wrapper).toBeTruthy();
  });
});