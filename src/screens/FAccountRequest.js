import React from 'react';
export default function FAccountRequest() {
  return (
    <div>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://connect.stripe.com/connect/default/oauth/test&client_id=ca_32D88BD1qLklliziD7gYQvctJIhWBSQ7&state={STATE_VALUE}'>
        Click here to set up a Stripe account
      </a>
    </div>
  );
}
