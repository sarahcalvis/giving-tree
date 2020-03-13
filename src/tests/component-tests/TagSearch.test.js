import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, StaticRouter } from 'react-router-dom'

import { TagSearch } from '../../components/TagSearch.js';
/*import firebase, {mockFirebase} from '../__mocks__/firebase';
jest.mock('../__mocks__/firebase');*/

const { mockFirebase } = require('firestore-jest-mock');
const { mockCollection, mockWhere } = require('firestore-jest-mock/mocks/firestore');


describe('Tag Search basics', () => {

  it('Renders correctly', () => {
    const wrap = shallow(<TagSearch />)
    expect(wrap).toMatchSnapshot();
  });
  
})

describe('TagSearch method: UpdateSearch', () => {

  
  mockFirebase({
    database: {
      tags: [
        { tags : ['tagOne', 'tagTwo'] },
      ],
    },
  });

  
  it('Testing the test',  () =>{
    const firebase = require('firebase');
    var db = firebase.firestore();
    var dbRef = db.collection("tags");

    dbRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var dbTags = doc.data().tags;
        expect(dbTags).toEqual(['tagOne', 'tagTwo'])
      });

    });
    
  });


  it('Gets tags from the database',  () =>{
    const firebase = require('firebase');
    const wrap = shallow(<TagSearch.WrappedComponent location={'/'}/>)
    const inst = wrap.instance();
    expect(wrap.find(TagSearch).state('tags')).toBe([{}]);
    inst.updateSearch();
    expect(wrap.find(TagSearch).state('tags')).toBe(['tagOne', 'tagTwo']);
    
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

describe('TagSearch method: SetCached', () => {

  
  
})

describe('TagSearch method: RetrieveCache', () => {

  
  
})

describe('TagSearch method: HandleClick', () => {

  
  
})

describe('TagSearch method: UpdateParent', () => {

  
  
})

describe('TagSearch method: HandleAutoChange', () => {

  
  
})
