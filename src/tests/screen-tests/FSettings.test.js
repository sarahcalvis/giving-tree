import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthUserContext from '../../auth/context.js';

import FSettings from '../../screens/FSettings.js';
import {firestore as FIRESTORE} from "firebase/app";
import { StaticRouter } from 'react-router-dom';
import { FSettingsMethods } from '../../screens/FSettings.js';
import { EditableData, EditItem } from '../../components/FSettingsListEditable.js';
import { NonEditableData, ToggleActive } from '../../components/FSettingList.js';
import { ExpansionPanelActions } from '@material-ui/core';


const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection, mockWhere } = require('firestore-jest-mock/mocks/firestore');

describe('FSettings', () => {

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
  const user = {email : 'blah@yada.net'};

  let firebase;
  let db;
  let wrap;

  beforeEach(() => {
    firebase = require('firebase');
    db = firebase.firestore();
    wrap = shallow(
      <AuthUserContext.Provider value={{user:{email: 'blah@yada.net'}}}>
        <StaticRouter>
          <FSettings />
        </StaticRouter>
      </AuthUserContext.Provider>
    )
  });

  it('Renders correctly', () => {  
    expect(wrap).toMatchSnapshot();
  });

  it('Loads correct data from the DB', () => {  
    
    FSettingsMethods().loadData(user, db, (doc) => expect(doc.data()).toEqual({
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
    }));
    
  });

  it('Submits correct data to the DB', () => {  
    var cfInfo = {
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
    };
    var changedText = {
      public_email: 'testie@tester.tested',
      public_phone: '9876543210',
    };

    FSettingsMethods().onSubmit(cfInfo, changedText ,user, db, (temp) => expect(temp).toEqual({
      name: 'The Test Foundation',
      public_email: 'testie@tester.tested',
      public_phone: '9876543210',
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
    }));
    
  });

  it('Submits correct time to thingy', () => {  
    var cfInfo = {
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
    };
    FSettingsMethods().toggleAccountActive(db, user, cfInfo , (time) => expect(time).toEqual(FIRESTORE.FieldValue.serverTimestamp()));
    
  });

  it('Submits correct time to thingy', () => {  
    var cfInfo = {
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
      date_deactivated: 'March 12, 2020 at 9:09:34 AM UTC-4',
    };
    FSettingsMethods().toggleAccountActive(db, user, cfInfo , (time) => expect(time).toEqual(''));
    
  });
  
  
})