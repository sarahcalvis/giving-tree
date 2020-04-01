import '@testing-library/jest-dom'
import React from 'react'
import Grant from '../../screens/Grant'
import { shallow } from 'enzyme';
import FirestoreMock from '../firestore.mock'

const mockFirestore = new FirestoreMock();

jest.mock('firebase/app', () => ({
  __esModule: true,
  initializeApp: () => { },
  apps: {
    length: true,
  },
  app: () => {
    return {
      auth: () => { },
      firestore: () => { return mockFirestore },
      storage: () => {
        return {
          get: jest.fn()
        }
      }
    }
  },
}));

describe('Grant', () => {

  beforeEach(() => {
    // wrapper = shallow(<MetaAdmin />);
  });

  it('renders shallowly without crashing', () => {
    const wrapper = shallow(<Grant />);
    expect(wrapper).toMatchSnapshot();
  });
});