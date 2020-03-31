import React from 'react';
import { shallow, mount } from 'enzyme';
import FirestoreMock from '../firestore.mock'
import FoundationCard from '../../components/FoundationCard';

const mockCfData = [{
  name: 'The Test Foundation',
  public_email: 'testy@tester.tested',
  public_phone: '1112223333',
  foundation_url: 'testme.com',
  fname_contact: 'Tabaath',
  lname_contact: 'Ben Test',
  personal_email: 'blah@yada.net',
  personal_phone: '9998887777',
  status: 'current',
  date_requested: { toDate: () => { return new Date('March 12, 2020 at 9:09:34 AM UTC-4') } },
  date_approved: { toDate: () => { return new Date('March 13, 2020 at 10:15:34 PM UTC-4') } },
  date_denied: '',
  date_deactivated: '',
},
{
  name: 'Charity Foundation',
  public_email: 'charity@mail.com',
  public_phone: '12345678945',
  foundation_url: 'charity.com',
  fname_contact: 'Chareth',
  lname_contact: 'Tyler',
  personal_email: 'chareth@yahoo.com',
  personal_phone: '4561237894',
  status: 'requested',
  date_requested: { toDate: () => { return new Date('March 09, 2020 at 9:09:34 AM UTC-4') } },
  date_approved: '',
  date_denied: '',
  date_deactivated: '',
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
      storage: () => {
        return {
          get: jest.fn()
        }
      },
    }
  },
}));


describe('FoundationCard', () => {

  beforeEach(() => {
    // wrapper = shallow(<MetaAdmin />);
    mockFirestore.reset();
  });

  it('renders shallowly without crashing', () => {
    const wrapper = shallow(<FoundationCard data= {mockCfData[0]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders mounted without crashing', () => {
    const wrapper = mount(<FoundationCard data= {mockCfData[0]} />);
  });
});