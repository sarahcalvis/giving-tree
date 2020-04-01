import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import PaymentForm from '../../components/PaymentForm';
import { Elements, StripeProvider } from 'react-stripe-elements';

test('Payment Form Basics', () => {
  // render(
  //   <div>
  //     <script src="https://js.stripe.com/v3/"></script>
  //     <StripeProvider apiKey='pk_test_y69Z0N4wM6r6dyy6Sh4kcrWH00bivSnSRM'>
  //       <PaymentForm />
  //     </StripeProvider>
  //   </div>
  // )
  // expect(screen).toMatchSnapshot();
});