import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import EditGrant from '../../components/EditGrant'
import FirestoreMock from '../firestore.mock'
import { MemoryRouter } from 'react-router-dom';
const mockFirestore = new FirestoreMock();


const routeComponentPropsMock = {
  history: {
    listen: jest.fn(),
  },
  location: {
    pathname: '/foundation/grant'
  },
  match: {},
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
          ref: jest.fn()
        }
      },
    }
  },
}));

test('Edit Grant Basics', () => {
  render(
    <MemoryRouter {...routeComponentPropsMock} >
      <EditGrant />
    </MemoryRouter>)
  expect(screen).toMatchSnapshot();
});
