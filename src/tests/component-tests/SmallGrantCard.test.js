import '@testing-library/jest-dom'
import React from 'react'
import { shallow } from 'enzyme';
import FirestoreMock from '../firestore.mock'

import SmallGrantCard from '../../components/SmallGrantCard'

const mockFirestore = new FirestoreMock();

const routeComponentPropsMock = {
  history: {},
  location: {},
  match: {}
}


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
          get: jest.fn(),
          ref: () => {
            return {
              child: jest.fn(),
            }
          }
        }
      },
    }
  },
}));

describe('Small Grant Card basics', () => {

  it('Renders correctly', () => {
    const wrap = shallow(<SmallGrantCard  {...routeComponentPropsMock} />)

    expect(wrap).toMatchSnapshot();
  });

})

