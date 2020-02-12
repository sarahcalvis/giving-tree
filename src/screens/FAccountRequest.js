import React, { useEffect } from 'react';
import { withAuthProtection } from '../auth';

function FAccountRequest() {
  // Set tab title
  useEffect(() => { document.title = 'Giving Tree: Request Account' }, []);

  return (
    <p>Account request screen</p>
  )
}

//TODO: Change Condition
const condition = authUser => true;
export default withAuthProtection(condition)(FAccountRequest);

// Default is check if logged in
// export default withAuthProtection()(FAccountRequest);
