// Stripe Server

const app = require('express')();
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_avCwuzIvg45JxkjItTyqRGH600JEoryzyP');
const admin = require('firebase-admin');
const serviceAccount = require("./secret/givingtree-cfs-firebase-adminsdk-grrpd-764871e22c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://givingtree-cfs.firebaseio.com"
});

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

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
    return res.json({ 'stripeId': connected_account_id });

  } catch (err) {
    res.status(500).end;
  }
})



//Get current user's ID token
//If metaadmin, call "getUserByEmail" w/ the community foundation email, update status to accepted/rejected
//If not metaadmin, get current user's ID token and set custom claim 'cf' to true
app.post('/setCustomClaims', (req, res) => {

  // Get the ID token passed.
  const idToken = req.body.idToken;
  const cfEmail = req.body.cfEmail;
  const cfStatus = req.body.cfStatus;

  // Verify the ID token and decode its payload.
  admin.auth().verifyIdToken(idToken).then((claims) => {
    //Check if metaadmin
    if (typeof claims.admin !== 'undefined' && claims.admin) {
      //Check that cfEmail and cfStatus were provided in request
      if (typeof cfEmail !== 'undefined' && cfStatus !== 'undefined'
        && cfEmail !== '' && cfStatus !== '') {
          //Get the CF User and update their permissions
          admin.auth().getUserByEmail(cfEmail).then((user) => {
            if (cfStatus === 'accepted') {
              admin.auth().setCustomUserClaims(user.uid, { accepted: true })
                .then(function () {
                  // Tell client to refresh token on user.
                  res.end(JSON.stringify({ status: 'success' }));
                })
                .catch((error) => {
                  res.end(JSON.stringify({ status: error }));
                });
            }
            else if (cfStatus === 'rejected') {
              admin.auth().setCustomUserClaims(user.uid, { rejected: true })
                .then(function () {
                  // Tell client to refresh token on user.
                  res.end(JSON.stringify({ status: 'success' }));
                })
                .catch((error) => {
                  res.end(JSON.stringify({ status: error }));
                });
            }
          })
            .catch((error) => {
              res.end(JSON.stringify({ status: error }));
            });
      }
    }
    else {
      // Not metaadmin, so we this post must be made from CF Account Request
      admin.auth().setCustomUserClaims(claims.sub, { cf: true })
        .then(function () {
          // Tell client to refresh token on user.
          res.end(JSON.stringify({ status: 'success' }));
        })
        .catch((error) => {
          res.end(JSON.stringify({ status: error }));
        });
    }
  });
});

app.listen(process.env.PORT);