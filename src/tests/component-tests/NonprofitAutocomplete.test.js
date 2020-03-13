import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, MemoryRouter } from 'react-router';

import GrantTagBar from '../../components/GrantTagBar.js';
import { StaticRouter } from 'react-router-dom';
import Nonprofit from '../../components/GrantTag.js';


describe('Component: GrantTagBar', () => {

  it('Renders correctly', () => {
    const gtbProps = {
      tags: ['Tag']
    };
    const wrap = shallow(<GrantTagBar id={45} tags={gtbProps.tags} />)
    expect(wrap).toMatchSnapshot();
  });

  it('State: no tags', () => {
    const gtbProps = {
      tags: []
    };
    const context = {};
    const wrap = mount(
      <StaticRouter location="someLocation" context={context}>
        <GrantTagBar id={45} tags={gtbProps.tags} />
      </StaticRouter>
    )
    //const tree = wrap.toJSON();
    expect(wrap.find(GrantTagBar).state('tags')).toEqual([])
  })


  it('State: one tag', () => {
    const gtbProps = {
      tags: ['Tag']
    };
    const context = {};
    const wrap = mount(
      <StaticRouter location="someLocation" context={context}>
        <GrantTagBar tags={gtbProps.tags} />
      </StaticRouter>
    )
  
    expect(wrap.find(GrantTagBar).state('tags')).toEqual(['Tag'])
  })

  it('State: two tags', () => {
    const gtbProps = {
      tags: ['First', 'Second']
    };
    const context = {};
    const wrap = mount(
      <StaticRouter location="someLocation" context={context}>
        <GrantTagBar id={45} tags={gtbProps.tags} />
      </StaticRouter>
    )
  
    expect(wrap.find(GrantTagBar).state('tags')).toEqual(['First', 'Second'])
  })
  
  
})


describe('Component: GrantTag', () => {
  
  it('Renders correctly', () => {
    const tag = 'Tag'
    const context = {};
    const wrap = shallow(
      <StaticRouter location="someLocation" context={context}>
        <GrantTag tag={tag} />
      </StaticRouter>
    )
    expect(wrap).toMatchSnapshot();
  });

  it('Tag Text', () => {
    const tag = 'Tag'
    const context = {};
    const wrap = shallow(
      <StaticRouter location="someLocation" context={context}>
        <GrantTag tag={tag} />
      </StaticRouter>
    )
    expect(wrap.find(GrantTag).prop('tag')).toEqual('Tag')
  })


  it('Link takes to Dashboard', () => {
    const tag = 'Tag'
    const wrapper = mount(<MemoryRouter><GrantTag tag={tag} key={0}/></MemoryRouter>);
    expect(wrapper.find('Link').props().to).toEqual({ pathname: "/", state: { "incomingTag": "Tag" } });
  })

  it('Link button body text', () => {
    const tag = 'Tag'
    const wrapper = mount(<MemoryRouter><GrantTag tag={tag} key={0}/></MemoryRouter>);
    expect(wrapper.find('Link').text()).toEqual("Tag");
  })
})
