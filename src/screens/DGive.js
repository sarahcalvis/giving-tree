// TODO: will receive props describing grant
// TODO: split up elements to make it look nicer

import React from 'react';
import PaymentForm from '../components/PaymentForm.js';
import { Elements, StripeProvider } from 'react-stripe-elements';
import {useParams} from 'react-router-dom';

export default function Stripe(props) {
  let [grantId] = React.useState(useParams().grantId);
  return (
    <StripeProvider apiKey='pk_test_BbhFvO5qUEG50YubWID2t2QQ00vde6BPl3'>
      <Elements>
        <PaymentForm grantId={grantId} />
      </Elements>
    </StripeProvider>
  )
}

