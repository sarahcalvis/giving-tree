import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import EditGrant from '../../components/EditGrant'
const { mockFirebase } = require('firestore-jest-mock');
import { shallow, mount } from 'enzyme';

describe('Edit Grant basics', () => {

  it('Renders correctly', () => {
    const wrap = shallow(<EditGrant />)
    
    expect(wrap).toMatchSnapshot();
  });
  
})
