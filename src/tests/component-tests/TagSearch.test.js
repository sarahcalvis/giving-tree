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

let wrap;
let inst;

beforeEach(() => {
  sessionStorage.clear();
  wrap = shallow(<TagSearch {...routeComponentPropsMock} />)
  inst = wrap.instance();
})

describe('Tag Search basics', () => {

  it('Renders correctly', () => {
    const wrap = shallow(<TagSearch />)
    
    expect(wrap).toMatchSnapshot();
  });
  
})

describe('All things cache', () => {
  
  it('Sets cache appropriately', () =>{
    inst.setCached('blah', 'yada');
    var data = JSON.parse(sessionStorage['blah']);
    
    expect(data.value).toEqual('yada');
    expect(sessionStorage.length).toBe(1);
  })

  it('Retrieves cache if cache exists and is recent enough', () =>{

    inst.setCached('blah', 'yada');
    const foo = inst.retrieveCached('blah', 100);
    
    expect(foo).toBe('yada');
  })

  it('Returns null if cache does not exist', () =>{  
    const foo = inst.retrieveCached('blah', 100);
    
    expect(foo).toBe(null);
  })

  it('Returns null if cache has expired', () =>{
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

  let firebase;
  let db;

  beforeEach(() => {
    firebase = require('firebase');
    db = firebase.firestore();
  });

  it('Gets tags from the database',  () =>{
    expect(wrap.state('tags')).toEqual([]);
    inst.updateSearch(db, (tags) => expect(tags).toEqual(['tagOne', 'tagTwo']));
  });

  it('Gets tags from cache',  () =>{
    inst.setCached('tagArray', ['tagOne', 'tagTwo']);
    
    inst.updateSearch(db, (tags) => expect(tags).toEqual(['tagOne', 'tagTwo']));
  });

})

describe('TagSearch method: GetLocationTag', () => {

  it('No prior location', () => {
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(ret).toEqual(
          null
        )
      }  
    }/>)
    const inst = wrap.instance();
    inst.getLocationTag(null);
  });

  it('Prior location 1', () => {
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(ret).toEqual(
          ['Me, Tag!']
        )
      }  
    }/>)
    const inst = wrap.instance();
    inst.getLocationTag('Me, Tag!');
  });

  it('Parent updated', () => {
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(spy).toHaveBeenCalled();
      }  
    }/>)
    const inst = wrap.instance();
    const spy = jest.spyOn(wrap.instance(), "updateParent");
    inst.getLocationTag('Me, Tag!')
  });

  it('Parent updated', () => {
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(wrap.state.incomingTag).toEqual('Me, Tag!');
      }  
    }/>)
    const inst = wrap.instance();
    inst.getLocationTag('Me, Tag!')
  });
  
})

describe('TagSearch method: SetDefaultAuto', () => {

  it('Set default if current props',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} tags={['tagOne', 'tagTwo']}/>)
    const inst = wrap.instance();
    
    expect(inst.setDefaultAuto()).toEqual(['tagOne', 'tagTwo']);
  });

  it('Set default if incoming tags',  () =>{  
    expect(inst.setDefaultAuto('tagOne')).toEqual(['tagOne']);
  });

  it('Set default if nothing',  () =>{ 
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

  it('Raise one tag and one freeText',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(ret).toEqual(
          { tags: ['tagOne'], freeText: ['freeOne']  }
        )
      }  
    }/>)
    const inst = wrap.instance();
    
    inst.setState({ activeTags: ['tagOne', 'tagTwo'], activeTextSearch: ['freeOne', 'freeTwo']  }, () => { 
      inst.handleAutoChange(null, ['tagOne', 'freeOne']);
    });
  });

  it('Raise two tags and no freeText',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(ret).toEqual(
          { tags: ['tagOne', 'tagThree'], freeText: []  }
        )
      }  
    }/>)
    const inst = wrap.instance();
    
    inst.setState({ activeTags: ['tagOne', 'tagTwo', 'tagThree']  }, () => { 
      inst.handleAutoChange(null, ['tagOne', 'tagThree']);
    });
  });
  
  it('Raise no tags and two freeText',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(ret).toEqual(
          { tags: [], freeText: ['freeOne', 'freeThree']  }
        )
      }  
    }/>)
    const inst = wrap.instance();
    
    inst.setState({ activeTags: ['tagOne', 'tagTwo'], activeTextSearch: ['freeOne', 'freeTwo', 'freeThree'] }, () => { 
      inst.handleAutoChange(null, ['freeOne', 'freeThree']);
    });
  });

  it('Raise tags not in active',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(ret).toEqual(
          { tags: ['tagOne', 'tagThree'], freeText: []  }
        )
      }  
    }/>)
    const inst = wrap.instance();
    
    inst.setState({ activeTags: ['tagTwo'], tags: ['tagOne', 'tagThree'] }, () => { 
      inst.handleAutoChange(null, ['tagOne', 'tagThree']);
    });
  });

  it('Raise free text not in active or tags',  () =>{
    const wrap = shallow(<TagSearch {...routeComponentPropsMock} 
      parentCallback={(ret) => {
        expect(ret).toEqual(
          { tags: [], freeText: ['freeOne']  }
        )
      }  
    }/>)
    const inst = wrap.instance();
    
    inst.setState({ activeTags: ['tagTwo'], tags: ['tagOne', 'tagThree'] }, () => { 
      inst.handleAutoChange(null, ['freeOne']);
    });
  });

})
