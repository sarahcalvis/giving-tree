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

const callback = (event, value) => {
  console.log(value, 'nonprofit_name');
}
const cfId = '4a1MMPzzdmREry9CUV6T'
const error = false;
const helperText = '';
const initialNonprofit = '95CmUGFPnxFUEagA1Mc3'

describe('Nonprofit Autocomplete basics', () => {

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

// test('shows the children when the checkbox is checked', () => {
//   const callback = (event, value) => {
//     console.log(value, 'nonprofit_name');
//   }
//   const cfId = '4a1MMPzzdmREry9CUV6T'
//   const error = false;
//   const helperText = '';
//   const initialNonprofit = '95CmUGFPnxFUEagA1Mc3'
//   render(<NonprofitAutocomplete
//     callback={callback}
//     cfId={cfId}
//     error={error}
//     helperText={helperText}
//     initialNonprofit={initialNonprofit} />)

//   // query* functions will return the element or null if it cannot be found
//   // get* functions will return the element or throw an error if it cannot be found
//   expect(screen.queryByText('PETA')).toBeNull()

//   // the queries can accept a regex to make your selectors more resilient to content tweaks and changes.
//   // fireEvent.click(screen.getByLabelText(/show/i))

//   // .toBeInTheDocument() is an assertion that comes from jest-dom
//   // otherwise you could use .toBeDefined()
//   expect(screen.getByText('PETA')).toBeInTheDocument()
// })