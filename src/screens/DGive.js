// TODO: will receive props describing grant
// TODO: split up elements to make it look nicer

import React from 'react';
import PaymentForm from '../components/PaymentForm.js';
import { Elements, StripeProvider } from 'react-stripe-elements';
import {useParams} from 'react-router-dom';

export default function Stripe(props) {
  let grantId = useParams().grant;
  return (
    <StripeProvider apiKey="pk_test_y69Z0N4wM6r6dyy6Sh4kcrWH00bivSnSRM">
      <Elements>
        <PaymentForm grantId={grantId} />
      </Elements>
    </StripeProvider>
  )
}

