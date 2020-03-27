import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthUserContext from '../../auth/context.js';

import FSettings from '../../screens/FSettings.js';
import {firestore as FIRESTORE} from "firebase/app";
import { StaticRouter } from 'react-router-dom';
import { FSettingsMethods } from '../../screens/FSettings.js';
import EditableData from '../../components/FSettingsListEditable.js';
import { EditItem } from '../../components/FSettingsListEditable.js';
import NonEditableData from '../../components/FSettingList.js';
import { StaticItem } from '../../components/FSettingList.js';
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

  it('Renders Noneditable correctly', () => {  
    ///console.log(wrap.find(FSettings).dive().debug())
    expect(wrap.find(FSettings).dive().find('NonEditableData')).toHaveLength(1);
  });

  it('Renders Editable correctly', () => {
    wrap = shallow(
      <AuthUserContext.Provider value={{user:{email: 'blah@yada.net'}}}>
        <StaticRouter>
          <FSettings edit={true}/>
        </StaticRouter>
      </AuthUserContext.Provider>
    )  
    expect(wrap.find(FSettings).dive().find('EditableData')).toHaveLength(1);
  });

  it('Toggles editable correctly', () => {
    FSettingsMethods().toggleEdit(true, (edit) => {expect(edit).toBe(false)})
    FSettingsMethods().toggleEdit(false, (edit) => {expect(edit).toBe(true)})
  });

  it('Sets edit prop as expected...', () => {
    expect(wrap.find(FSettings).props('edit')).toEqual({});
  });
  
})

describe('NoneditableData', () => {
  
  let wrap;

  const cfInfo = {
    name: 'The Test Foundation',
    public_email: 'testy@tester.tested',
    public_phone: '1112223333',
    foundation_url: 'testme.com',
    fname_contact: 'Tabaath',
    lname_contact: 'Ben Test',
    personal_email: 'blah@yada.net',
    personal_phone: '9998887777',
  }

  beforeEach(() => {
    wrap = shallow(
        <NonEditableData 
          cfInfo={cfInfo}
          toggleEdit={() => {console.log('hi')}}
          onSubmit={() => {console.log('hi')}} 
        />
    )
  });

  it('Renders correctly', () => {  
    expect(wrap).toMatchSnapshot();
  });

  it('StaticItem renders correctly', () => {  
    wrap = shallow(
      <StaticItem 
        icon={'<PhoneIphoneIcon />'}
        label={"Contact Phone"}
        value={1928447583}
      />
  )
    expect(wrap).toMatchSnapshot();
  });
})


describe('EditableData basics', () => {
  
  let wrap;

  const cfInfo = {
    name: 'The Test Foundation',
    public_email: 'testy@tester.tested',
    public_phone: '1112223333',
    foundation_url: 'testme.com',
    fname_contact: 'Tabaath',
    lname_contact: 'Ben Test',
    personal_email: 'blah@yada.net',
    personal_phone: '9998887777',
  }

  beforeEach(() => {
    wrap = shallow(
        <EditableData 
          isEdit={true}
          cfInfo={cfInfo}
          toggleEdit={() => {console.log('hi')}}
          onSubmit={() => {console.log('hi')}} 
        />
    )
  });

  it('Renders correctly', () => {  
    expect(wrap).toMatchSnapshot();
  });

  it('Does stuff correctly', () => {  
    expect(wrap.find(EditItem).at(0).props().label).toBe('Foundation Name');
    expect(wrap.find(EditItem).at(1).props().label).toBe('Public Email');
    expect(wrap.find(EditItem).at(2).props().label).toBe('Public Phone');
    expect(wrap.find(EditItem).at(3).props().label).toBe('Foundation URL');
    expect(wrap.find(EditItem).at(4).props().label).toBe('Contact First Name');
    expect(wrap.find(EditItem).at(5).props().label).toBe('Contact Last Name');
    expect(wrap.find(EditItem).at(6).props().label).toBe('Contact Email');
    expect(wrap.find(EditItem).at(7).props().label).toBe('Contact Phone');
  });

  it('EditItem renders correctly', () => {  
    wrap = shallow(
      <EditItem 
        icon={'<ContactsOutlinedIcon />'}
        label={'Contact Last Name'}
        default={'Matthewson'}
        change={(e, f) => console.log(e, 'lname_contact')}
        helper={'helperText.lname_contact'}
      />
  )
    expect(wrap).toMatchSnapshot();
  });
  
})


describe('EditableData change and submit', () => {

  let wrap;

  const cfInfo = {
    name: 'The Test Foundation',
    public_email: 'testy@tester.tested',
    public_phone: '1112223333',
    foundation_url: 'testme.com',
    fname_contact: 'Tabaath',
    lname_contact: 'Ben Test',
    personal_email: 'blah@yada.net',
    personal_phone: '9998887777',
  }
  
  it('Changes name and submits correctly', () => {  
    wrap = shallow(
      <EditableData 
        isEdit={true}
        cfInfo={cfInfo}
        toggleEdit={() => {console.log('hi')}}
        onSubmit={(changedText) => {expect(changedText).toEqual({name: "I am changed!!"})}} 
      />
    )

    const mockedEvent = { target: {value: "I am changed!!"} }
    wrap.find(EditItem).at(0).prop('change')(mockedEvent);
    wrap.update();
    wrap.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
  });

  it('Changes public email and submits correctly', () => {  
    wrap = shallow(
      <EditableData 
        isEdit={true}
        cfInfo={cfInfo}
        toggleEdit={() => {console.log('hi')}}
        onSubmit={(changedText) => {expect(changedText).toEqual({public_email: "crud@blah.foo"})}} 
      />
    )

    const mockedEvent = { target: {value: "crud@blah.foo"} }
    wrap.find(EditItem).at(1).prop('change')(mockedEvent);
    wrap.update();
    wrap.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
  });

  it('Changes public phone and submits correctly', () => {  
    wrap = shallow(
      <EditableData 
        isEdit={true}
        cfInfo={cfInfo}
        toggleEdit={() => {console.log('hi')}}
        onSubmit={(changedText) => {expect(changedText).toEqual({public_phone: "1234567890"})}} 
      />
    )

    const mockedEvent = { target: {value: "1234567890"} }
    wrap.find(EditItem).at(2).prop('change')(mockedEvent);
    wrap.update();
    wrap.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
  });

  it('Changes foundation url and submits correctly', () => {  
    wrap = shallow(
      <EditableData 
        isEdit={true}
        cfInfo={cfInfo}
        toggleEdit={() => {console.log('hi')}}
        onSubmit={(changedText) => {expect(changedText).toEqual({foundation_url: "dumb.com"})}} 
      />
    )

    const mockedEvent = { target: {value: "dumb.com"} }
    wrap.find(EditItem).at(3).prop('change')(mockedEvent);
    wrap.update();
    wrap.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
  });

  it('Changes first name and submits correctly', () => {  
    wrap = shallow(
      <EditableData 
        isEdit={true}
        cfInfo={cfInfo}
        toggleEdit={() => {console.log('hi')}}
        onSubmit={(changedText) => {expect(changedText).toEqual({fname_contact: "John"})}} 
      />
    )

    const mockedEvent = { target: {value: "John"} }
    wrap.find(EditItem).at(4).prop('change')(mockedEvent);
    wrap.update();
    wrap.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
  });

  it('Changes last name and submits correctly', () => {  
    wrap = shallow(
      <EditableData 
        isEdit={true}
        cfInfo={cfInfo}
        toggleEdit={() => {console.log('hi')}}
        onSubmit={(changedText) => {expect(changedText).toEqual({lname_contact: "Bunyen"})}} 
      />
    )

    const mockedEvent = { target: {value: "Bunyen"} }
    wrap.find(EditItem).at(5).prop('change')(mockedEvent);
    wrap.update();
    wrap.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
  });

  it('Changes personal phone and submits correctly', () => {  
    wrap = shallow(
      <EditableData 
        isEdit={true}
        cfInfo={cfInfo}
        toggleEdit={() => {console.log('hi')}}
        onSubmit={(changedText) => {expect(changedText).toEqual({personal_phone: "0987654321"})}} 
      />
    )

    const mockedEvent = { target: {value: "0987654321"} }
    wrap.find(EditItem).at(7).prop('change')(mockedEvent);
    wrap.update();
    wrap.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
  });

  it('Changes personal phone WRONG and gives errors correctly', () => {  
    wrap = shallow(
      <EditableData 
        isEdit={true}
        cfInfo={cfInfo}
        toggleEdit={() => {console.log('hi')}}
        onSubmit={(changedText) => {expect(changedText).toEqual({personal_phone: "0987654321"})}} 
        errorCallback={(helperText) => {expect(helperText['personal_phone']).toEqual('*Please enter a valid phone number.')}}
      />
    )

    const mockedEvent = { target: {value: "09874321"} }
    wrap.find(EditItem).at(7).prop('change')(mockedEvent);
    wrap.update();
    wrap.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
  });

});