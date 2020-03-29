import React from 'react';
import { shallow } from 'enzyme';
import FirestoreMock from '../firestore.mock'
import { MetaAdmin } from '../../screens/MetaAdmin';
import firebase from 'firebase/app';
import 'firebase/firestore';

const mockCfs = [
  {
    name: 'The Test Foundation',
    public_email: 'testy@tester.tested',
    public_phone: '1112223333',
    foundation_url: 'testme.com',
    fname_contact: 'Tabaath',
    lname_contact: 'Ben Test',
    personal_email: 'blah@yada.net',
    personal_phone: '9998887777',
    status: 'current',
    date_requested: 'March 12, 2020 at 9:09:34 AM UTC-4',
    date_approved: 'March 13, 2020 at 10:15:34 PM UTC-4',
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
    date_requested: 'March 09, 2020 at 9:09:34 AM UTC-4',
    date_approved: '',
    date_denied: '',
    date_deactivated: '',
  },
]

describe('MetaAdmin', () => {

  beforeEach(() => {
    // wrapper = shallow(<MetaAdmin />);
  });

  // it('renders shallowly without crashing', () => {
  //   const wrapper = shallow(<MetaAdmin />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  describe('uses firestore', () => {
    const firestoreMock = new FirestoreMock();

    beforeEach(() => {
      firebase.firestore().collection = firestoreMock.mockCollection;
      firestoreMock.reset();
    });

    it('call community foundations snapshot on render', async () => {
      firestoreMock.mockOnSnapshotSuccess = mockCfs;

      const wrapper = shallow(<MetaAdmin />);
      wrapper.update();

      expect(firestoreMock.mockCollection).toBeCalledWith('communityFoundations');
      // expect(firestoreMock.mockOnSnapshot).toBeCalled(1);
    });
  });

});
// describe('The Agreement model', () => {
//   const firestoreMock = new FirestoreMock()
//   beforeEach(() => {
//       firebase.firestore = firestoreMock
//       firestoreMock.reset()
//   })

//   it('does something', (done) => {
//       firestoreMock.mockAddReturn = { id: 'test-id' }
//       firebase.firestore.collection('foobar')
//         .add({foo: 'bar'})
//         .then(res => {
//           expect(firestoreMock.mockCollection).toBeCalledWith('foobar')
//           expect(firestoreMock.mockAdd).toBeCalledWith({foo: 'bar'})
//           expect(res.id).toEqual('test-id')
//           done()
//         })
//         .catch(done)
//   })
// })