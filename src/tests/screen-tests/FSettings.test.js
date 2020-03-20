import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthUserContext from '../../auth/context.js';

import FSettings from '../../screens/FSettings.js';
import { StaticRouter } from 'react-router-dom';
import { Data } from '../../screens/FSettings.js';
import { EditableData, EditItem } from '../../components/FSettingsListEditable.js';
import { NonEditableData, ToggleActive } from '../../components/FSettingList.js';
import { ExpansionPanelActions } from '@material-ui/core';


const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection, mockWhere } = require('firestore-jest-mock/mocks/firestore');


describe('FSettings', () => {

  it('Renders correctly', () => {
    mockFirebase({
      database: {
        communityFoundations: [
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
        ],
      },
    });
  
    let firebase;
    let db;
  
    beforeEach(() => {
      firebase = require('firebase');
      db = firebase.firestore();
    });

    const wrap = shallow(
      <AuthUserContext.Provider value={{user:{email: 'blah@yada.net'}}}>
        <StaticRouter>
          <FSettings />
        </StaticRouter>
      </AuthUserContext.Provider>
      
    )
    console.log(wrap.props);
    expect(wrap).toMatchSnapshot();
    
  });
  
})