import React from "react"
import { Switch, Route } from "react-router-dom"
import DDashboard from '../screens/DDashboard.js';
import DGive from '../screens/DGive.js';
import DGrant from '../screens/DGrant.js';
import FAccountRequest from '../screens/FAccountRequest.js';
import FDetailedGrant from '../screens/FDetailedGrant.js';
import FEditGrant from '../screens/FEditGrant.js';
import FGrants from '../screens/FGrants.js';
import FRequestSent from '../screens/FRequestSent.js';
import FSettings from '../screens/FSettings.js';
import LInputNewPassword from '../screens/LInputNewPassword.js';
import Login from '../screens/Login.js';
import LRequestNewPassword from '../screens/LRequestNewPassword.js';
import MetaAdmin from '../screens/MetaAdmin.js';

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={DDashboard} />
            <Route exact path='/grants/:grantId' component={DGrant} />
            <Route exact path='/grants/:grantId/give' component={DGive} />
            <Route exact path='/request-account' component={FAccountRequest} />
            <Route exact path='/request-sent' component={FRequestSent} />
            <Route exact path='/foundation' component={FGrants} />
            <Route exact path='/foundation/:grantId' component={FDetailedGrant} />
            <Route exact path='/foundation/:grantId/edit' component={FEditGrant} />
            <Route exact path='/foundation/Settings' component={FSettings} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/request-new-password' component={LRequestNewPassword} />
            <Route exact path='/input-new-password' component={LInputNewPassword} />
            <Route exact path='/meta-admin' component={MetaAdmin} />
            {/*<Route component={NotFound} />*/}
        </Switch>
    )

}