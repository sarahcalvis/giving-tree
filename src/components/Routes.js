import React from "react"
import { Switch, Route } from "react-router-dom"

import DDashboard from '../screens/DDashboard.js';
import DGive from '../screens/DGive.js';
import Grant from '../screens/Grant.js';
import FAccountRequest from '../screens/FAccountRequest.js';
import FEditGrant from '../screens/FEditGrant.js';
import FGrants from '../screens/FGrants.js';
import FRequestSent from '../screens/FRequestSent.js';
import FSettings from '../screens/FSettings.js';
import LInputNewPassword from '../screens/LInputNewPassword.js';
import SignIn from '../screens/SignIn.js';
import SignUp from '../screens/SignUp.js';
import ForgotPassword from '../screens/ForgotPassword.js';
import MetaAdmin from '../screens/MetaAdmin.js';
import FStripeSetup from '../screens/FStripeSetup.js';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={DDashboard} />
      <Route exact path='/grants/:grantId' component={Grant} />
      <Route exact path='/grants/:grantId/give' component={DGive} />
      <Route exact path='/request-account' component={FAccountRequest} />
      <Route exact path='/request-sent' component={FRequestSent} />
      <Route exact path='/foundation' component={FGrants} />
      <Route exact path='/foundation/stripe-setup' component={FStripeSetup} />
      <Route exact path='/foundation/grant/:grantId' component={Grant} />
      <Route exact path='/foundation/edit/:grantId' component={FEditGrant} />
      <Route exact path='/foundation/create-grant' component={FEditGrant} />
      <Route exact path='/foundation/settings' component={FSettings} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/forgot' component={ForgotPassword} />
      <Route exact path='/input-new-password' component={LInputNewPassword} />
      <Route exact path='/meta-admin' component={MetaAdmin} />
      {/*<Route component={NotFound} />*/}
    </Switch>
  )
}