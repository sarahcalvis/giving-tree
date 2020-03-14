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
  it('Sets cache appropriately', () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} />)
    const inst = wrap.instance();
    inst.setCached('blah', 'yada');
    var data = JSON.parse(sessionStorage['blah']);
    
    expect(data.value).toEqual('yada');
    expect(sessionStorage.length).toBe(1);
  })

  it('Retrieves cache if cache exists and is recent enough', () =>{
    sessionStorage.clear();
    
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} />)
    const inst = wrap.instance();
    inst.setCached('blah', 'yada');
    const foo = inst.retrieveCached('blah', 100);
    
    expect(foo).toBe('yada');
  })

  it('Returns null if cache does not exist', () =>{
    sessionStorage.clear();
    
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} />)
    const inst = wrap.instance();
    const foo = inst.retrieveCached('blah', 100);
    
    expect(foo).toBe(null);
  })

  it('Returns null if cache has expired', () =>{
    sessionStorage.clear();
    
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} />)
    const inst = wrap.instance();
    inst.setCached('blah', 'yada');
    const foo = inst.retrieveCached('blah', 0);
    
    expect(foo).toBe(null);
  })
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
    sessionStorage.clear();
    const firebase = require('firebase');
    var db = firebase.firestore();

    const wrap = shallow(<TagSearch {...routeComponentPropsMock} />)
    const inst = wrap.instance();
    inst.setCached('tagArray', ['tagOne', 'tagTwo']);
    
    inst.updateSearch(db, (tags) => expect(tags).toEqual(['tagOne', 'tagTwo']));
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

  it('Set default if current props',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} tags={['tagOne', 'tagTwo']}/>)
    const inst = wrap.instance();
    
    expect(inst.setDefaultAuto()).toEqual(['tagOne', 'tagTwo']);
  });

  it('Set default if incoming tags',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} />)
    const inst = wrap.instance();
    
    expect(inst.setDefaultAuto('tagOne')).toEqual(['tagOne']);
  });

  it('Set default if nothing',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} />)
    const inst = wrap.instance();
    
    expect(inst.setDefaultAuto()).toEqual(null);
  });
  
})

describe('TagSearch method: UpdateParent', () => {

  it('Passes tags and freetext up to parent',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(ret).toEqual(
          { tags: ['tagOne', 'tagTwo'], freeText: ['freeOne', 'freeTwo']  }
        )
      }  
    }/>)
    const inst = wrap.instance();
    
    inst.setState({ activeTags: ['tagOne', 'tagTwo'], activeTextSearch: ['freeOne', 'freeTwo']  }, () => { 
      inst.updateParent();
    });
  });
  
})

describe('TagSearch method: HandleAutoChange', () => {

  
  
})
