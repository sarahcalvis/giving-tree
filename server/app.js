// Stripe Server

const app = require('express')();
const stripe = require('stripe')('sk_test_iKDj5WxPhlc4Dz1JJUhDmosi0052mQo2A7');

app.use(require('body-parser').text());

app.post('/charge', async (req, res) => {
  let source = req.body.split(' amount: ')[0];
  let amount = req.body.split(' amount: ')[1].split(' description: ')[0];
  let description = req.body.split(' amount: ')[1].split(' description: ')[1].split(' account: ')[0];
  let account = req.body.split(' amount: ')[1].split(' description: ')[1].split(' account: ')[1];
  try {
    let { status } = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      description: description,
      source: source,
    }, {
      stripeAccount: account,
    }).then(function (charge) {
      // asynchronously called
      return charge;
    });

    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.post('/create', async (req, res) => {
  try {
    let connected_account_id = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code: req.body,
    }).then(function (response) {
      // asynchronously called
      return response.stripe_user_id;
    });
    return res.json({ 'acctID': connected_account_id });

  } catch (err) {
    res.status(500).end;
  }
})

app.listen(process.env.PORT);