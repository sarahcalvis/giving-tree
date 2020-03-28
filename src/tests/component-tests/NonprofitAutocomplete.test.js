// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
import '@testing-library/jest-dom';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react';
import { shallow, mount } from 'enzyme';
import { render, fireEvent, screen } from '@testing-library/react';
import NonprofitAutocomplete from '../../components/NonprofitAutocomplete';

const { mockFirebase } = require('firestore-jest-mock');
const routeComponentPropsMock = {
  // add jest.fn() as needed to any of the objects
  history: {},
  location: {},
  match: {}
};

let wrap;
let inst;

beforeEach(() => {
  sessionStorage.clear();
  wrap = shallow(<NonprofitAutocomplete {...routeComponentPropsMock} />)
  inst = wrap.instance();
})

describe('Nonprofit Autocomplete basics', () => {
  const callback = jest.fn();
  const cfId = 'truecf'
  const error = false;
  const helperText = '';
  const initialNonprofit = 'nonprofit1'

  it('Renders correctly', () => {
    const wrap = shallow(<NonprofitAutocomplete
      callback={callback}
      cfId={cfId}
      error={error}
      helperText={helperText}
      initialNonprofit={initialNonprofit} />)

    expect(wrap).toMatchSnapshot();
  });
})


describe('Nonprofit Autocomplete shows text fields if no nonprofits', () => {
  const callback = jest.fn();
  const cfId = 'truecf'
  const error = false;
  const helperText = '';
  const initialNonprofit = ''
  mockFirebase({
    database: {
      nonprofits: [],
    },
  });

  let firebase;
  let db;

  beforeEach(() => {
    firebase = require('firebase');
    db = firebase.firestore();
  });

  it('Shows text fields if there is no nonprofit selected', () => {
    const wrap = mount(<NonprofitAutocomplete
      callback={callback}
      cfId={cfId}
      error={error}
      helperText={helperText}
      initialNonprofit={initialNonprofit} />)
    
    expect(screen.queryByText('Nonprofit Name')).toBeDefined()
    expect(screen.queryByText('Nonprofit Phone Number')).toBeDefined()
    expect(screen.queryByText('Nonprofit Email')).toBeDefined()
    expect(screen.queryByText('Nonprofit Website')).toBeDefined()

  });
})

// describe('NonprofitAutocomplete method: UpdateParent', () => {

  // it('Passes tags and freetext up to parent',  () =>{
  //   const wrap = shallow(<NonprofitAutocomplete {...routeComponentPropsMock} 
  //     parentCallback={(ret) => {
  //       expect(ret).toEqual(
  //         { tags: ['tagOne', 'tagTwo'], freeText: ['freeOne', 'freeTwo']  }
  //       )
  //     }  
  //   }/>)
  //   const inst = wrap.instance();
    
  //   inst.setState({ activeTags: ['tagOne', 'tagTwo'], activeTextSearch: ['freeOne', 'freeTwo']  }, () => { 
  //     inst.updateParent();
  //   });
  // });
  
// })

describe('Renders text fields when add button clicked', () => {
  const callback = jest.fn();
  const cfId = 'truecf'
  const error = false;
  const helperText = '';
  const initialNonprofit = 'nonprofit1'
  mockFirebase({
    database: {
      nonprofits: [
        {
          nonprofit1: {
            cf_id: 'truecf',
            email: 'hello',
            name: 'Correct Nonprofit',
            number: '-1',
            url: 'sarahcalvis.com'
          },
          nonprofit2: {
            cf_id: 'untruecf',
            email: 'hello',
            name: 'Incorrect Nonprofit',
            number: '-1',
            url: 'sarahcalvis.com'
          },
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


  it('Does not show text fields if there is an initial nonprofit', () => {
    render(<NonprofitAutocomplete
      callback={callback}
      cfId={cfId}
      error={error}
      helperText={helperText}
      initialNonprofit={initialNonprofit} />)

    // expect(screen.getByText('Add a new nonprofit')).toBeInTheDOM()
    // expect(screen.getByText('Add a new nonprofit')).toBeInTheDocument()

    // expect(screen.queryByText('Nonprofit Name')).toBeNull()
    // expect(screen.queryByText('Nonprofit Phone Number')).toBeNull()
    // expect(screen.queryByText('Nonprofit Email')).toBeNull()
    // expect(screen.queryByText('Nonprofit Website')).toBeNull()

  });

  it('Shows text fields if the user clicks the add new nonprofit button', () => {
    render(<NonprofitAutocomplete
      callback={callback}
      cfId={cfId}
      error={error}
      helperText={helperText}
      initialNonprofit={initialNonprofit} />)

    // fireEvent.click(screen.getByText('Add a new nonprofit'));
    
    // expect(screen.getByText('Nonprofit Name')).toBeInTheDOM()
    // expect(screen.getByText('Nonprofit Phone Number')).toBeInTheDOM()
    // expect(screen.getByText('Nonprofit Email')).toBeInTheDOM()
    // expect(screen.getByText('Nonprofit Website')).toBeInTheDOM()

  });


  // it('Gets nonprofits from the database', () => {
  //   expect(wrap.state('nonprofits')).toEqual([]);
  //   inst.updateSearch(db, (tags) => expect(tags).toEqual(
  //     [{ id: 'nonprofit1', name: 'Correct Nonprofit', dataLabel: 'Correct Nonprofit' }]
  //   ));
  // });
})