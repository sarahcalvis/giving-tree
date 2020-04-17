import React from "react"
import { Route, Switch } from 'react-router-dom';
import DDashboard from '../screens/DDashboard.js';
import DGive from '../screens/DGive.js';
import Grant from '../screens/Grant.js';
import FAccountRequest from '../screens/FAccountRequest.js';
import FEditGrant from '../screens/FEditGrant.js';
import FDashboard from '../screens/FDashboard.js';
import FRequestSent from '../screens/FRequestSent.js';
import FRequestDenied from '../screens/FRequestDenied.js';
import FSettings from '../screens/FSettings.js';
import SignIn from '../screens/SignIn.js';
import SignUp from '../screens/SignUp.js';
import ForgotPassword from '../screens/ForgotPassword.js';
import MetaAdmin from '../screens/MetaAdmin.js';
import FStripeSetup from '../screens/FStripeSetup.js';
import NotFound from '../screens/NotFound.js';

export default function Routes() {
  return (
      <Switch>
        <Route exact path='/' component={DDashboard} />
        <Route exact path='/grants/:grantId' component={Grant} />
        <Route exact path='/grants/:grantId/give' component={DGive} />
        <Route exact path='/request-account' component={FAccountRequest} />
        <Route exact path='/request-sent' component={FRequestSent} />
        <Route exact path='/request-denied' component={FRequestDenied} />
        <Route exact path='/foundation' component={FDashboard} />
        <Route exact path='/foundation/stripe-setup' component={FStripeSetup} />
        <Route exact path='/foundation/grant/:grantId' component={Grant} />
        <Route exact path='/foundation/edit/:grantId' component={FEditGrant} />
        <Route exact path='/foundation/create-grant' component={FEditGrant} />
        <Route exact path='/foundation/settings' component={FSettings} />
        <Route exact path='/signin' component={SignIn} />
        {/* <Route exact path='/signup' component={SignUp} /> */}
        <Route exact path='/forgot' component={ForgotPassword} />
        <Route exact path='/meta-admin' component={MetaAdmin} />
        <Route component={NotFound} />
      </Switch>
  )
}