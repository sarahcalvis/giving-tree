import '@testing-library/jest-dom'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { render, screen } from '@testing-library/react'
import DDashboard from '../../screens/DDashboard'
import FirestoreMock from '../firestore.mock'
import * as FirebaseHooks from 'react-firebase-hooks/firestore';

const mockCfDocs = [{
  data: () => {
    return {
      dist: -1,
      id: "ASDF1234asdf",
      title: "Grant Title",
      cfName: "Calvis Community Foundation",
      nonprofitName: "NonProf Name",
      goalAmt: 300000000000,
      moneyRaised: 0,
      img: 'GivingTree.png',
      nonprofitId: "4a1MMPzzdmREry9CUV6T",
      address: "1911 C Street NE, Washington D.C. 20002",
      lat: 40,
      long: -70,
      datePosted: 'March 09, 2020 at 9:09:34 AM UTC-4',
      dateDeadline: 'March 09, 2020 at 9:09:34 AM UTC-4',
      desc: 'gimme that cash',
      status: "deleted",
      tags: [],
    }
  }
},
{
  data: () => {
    return {
      dist: -1,
      id: "ASDF1234asdf",
      title: "Grant Title",
      cfName: "Calvis Community Foundation",
      nonprofitName: "NonProf Name",
      goalAmt: 300000000000,
      moneyRaised: 0,
      img: 'GivingTree.png',
      nonprofitId: "4a1MMPzzdmREry9CUV6T",
      address: "1911 C Street NE, Washington D.C. 20002",
      lat: 40,
      long: -70,
      datePosted: 'March 09, 2020 at 9:09:34 AM UTC-4',
      dateDeadline: 'March 09, 2020 at 9:09:34 AM UTC-4',
      desc: 'gimme that cash',
      status: "deleted",
      tags: [],
    }
  }
}
]

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
    }
  },
}));

describe('DDashboard', () => {

  test('DDashboard Basics', () => {
    jest.mock('react-router', () => ({
      useParams: jest.fn().mockReturnValue({ id: '123' }),
    }));
    
    render(<DDashboard />);
    expect(screen).toMatchSnapshot();
  });
  
  describe('DDashboard with mocked data', () => {
    it('uses the search callback correctly', () => {
  
    })
  })
  
  describe('uses firestore', () => {
    beforeEach(() => {
      const forEachMock = jest.fn(() => { return mockCfDocs });
      const snapshot = { forEach: forEachMock };
      FirebaseHooks.useCollection = () => { return [snapshot, false, false] };
      mockFirestore.reset();
    });
  
    it('call grants snapshot on render', () => {
      const wrapper = mount(<DDashboard />);
      wrapper.update();
      expect(mockFirestore.mockCollection).toBeCalledWith('grants');
      expect(mockFirestore.mockCollection).toHaveBeenCalledTimes(2);
    });
  });

})
