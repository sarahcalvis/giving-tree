import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, StaticRouter } from 'react-router-dom'

import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

import { TagSearch } from '../../components/TagSearch.js';
/*import firebase, {mockFirebase} from '../__mocks__/firebase';
jest.mock('../__mocks__/firebase');*/

const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection, mockWhere } = require('firestore-jest-mock/mocks/firestore');


const routeComponentPropsMock = {
  // add jest.fn() as needed to any of the objects
  history: {},
  location: {},
  match: {}
}


describe('Tag Search basics', () => {

  it('Renders correctly', () => {
    const wrap = shallow(<TagSearch />)
    expect(wrap).toMatchSnapshot();
  });
  
})

describe('All things cache', () => {

  
  
})

describe('TagSearch method: UpdateSearch', () => {

  mockFirebase({
    database: {
      tags: [
        { tags : ['tagOne', 'tagTwo'] },
      ],
    },
  });

  it('Gets tags from the database',  () =>{

    const firebase = require('firebase');
    var db = firebase.firestore();
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} />)
    const inst = wrap.instance();
    expect(wrap.state('tags')).toEqual([]);
    inst.updateSearch(db, (tags) => expect(tags).toEqual(['tagOne', 'tagTwo']));

  });

  it('Gets tags from cache',  () =>{

    expect('I am not done').toEqual('I am not done');

  });

})

describe('TagSearch method: ComponentWillMount', () => {

  /*it('No prior location', () => {
    // TODO: No location
  });

  it('Prior location 1', () => {
    // TODO: Prior location
  });

  it('Prior location, returns element', () => {
    // TODO: Prior location
  });*/
  
})

describe('TagSearch method: SetDefaultAuto', () => {

  
  
})



describe('TagSearch method: HandleClick', () => {

  
  
})

describe('TagSearch method: UpdateParent', () => {

  
  
})

describe('TagSearch method: HandleAutoChange', () => {

  
  
})
