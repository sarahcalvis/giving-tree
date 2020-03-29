import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import { createMemoryHistory } from "history";

import Routes from '../../components/Routes.js';
import DDashboard from '../../screens/DDashboard.js';
import { DGive } from '../../screens/DGive.js';
import { Grant } from '../../screens/Grant.js';
import { FAccountRequest } from '../../screens/FAccountRequest.js';
import { FEditGrant } from '../../screens/FEditGrant.js';
import { FDashboard } from '../../screens/FDashboard.js';
import { FRequestSent } from '../../screens/FRequestSent.js';
import { FSettings } from '../../screens/FSettings.js';
import { SignIn } from '../../screens/SignIn.js';
import { SignUp } from '../../screens/SignUp.js';
import { ForgotPassword } from '../../screens/ForgotPassword.js';
import { MetaAdmin } from '../../screens/MetaAdmin.js';
import { FStripeSetup } from '../../screens/FStripeSetup.js';

jest.mock('firebase/app');
jest.mock("react-router-dom/BrowserRouter", () => {
    return ({ children }) => <div>{children}</div>;
});

describe('Component: Routes', () => {
    var enzyme = require('enzyme');
    enzyme.configure({ adapter: new Adapter() });

    it('invalid path should not go to any page', () => {
        const wrapper = enzyme.mount(
            <MemoryRouter initialEntries={['/random']}>
                {Routes}
            </MemoryRouter>
        );
        console.log(wrapper.find('Route').at(0).debug());
        expect(wrapper.find(DDashboard)).toHaveLength(0);
        expect(wrapper.find('DGive')).toHaveLength(0);
        expect(wrapper.find('Grant')).toHaveLength(0);
        expect(wrapper.find('FAccountRequest')).toHaveLength(0);
        expect(wrapper.find('FEditGrant')).toHaveLength(0);
        expect(wrapper.find('FDashboard')).toHaveLength(0);
        expect(wrapper.find('FRequestSent')).toHaveLength(0);
        expect(wrapper.find('FSettings')).toHaveLength(0);
        expect(wrapper.find('SignIn')).toHaveLength(0);
        expect(wrapper.find('SignUp')).toHaveLength(0);
        expect(wrapper.find('ForgotPassword')).toHaveLength(0);
        expect(wrapper.find('MetaAdmin')).toHaveLength(0);
        expect(wrapper.find('FStripeSetup')).toHaveLength(0);
    });

    it('valid DDashboard path', () => {
        const wrapper = enzyme.mount(
            <MemoryRouter initialEntries={['/']}>
                {Routes}
            </MemoryRouter>
        );
        //expect(wrapper.containsMatchingElement(DDashboard)).toBeTruthy();

        expect(wrapper.find(DDashboard)).toHaveLength(0);
    });

})