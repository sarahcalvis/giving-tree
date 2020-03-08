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
    console.log('verified token\n');

    //Check if metaadmin
    if (typeof claims.admin !== 'undefined' && claims.admin) {
      //Check that cfEmail and cfStatus were provided in request
      if (typeof cfEmail !== 'undefined' && typeof cfStatus !== 'undefined'
        && cfEmail !== '' && cfStatus !== '' && typeof claims.cfId !== 'undefined' ) {
        //Get the CF User and update their permissions
        admin.auth().getUserByEmail(cfEmail).then((user) => {
          if (cfStatus === 'current') {
            admin.auth().setCustomUserClaims(user.uid, { cfId: claims.cfId, status: 'current' })
              .then(function () {
                // Tell client to refresh token on user.
                res.end(JSON.stringify({ status: 'success' }));
              })
              .catch((error) => {
                res.end(JSON.stringify({ status: error }));
              });
          }
          else if (cfStatus === 'denied') {
              admin.auth().setCustomUserClaims(user.uid, { cfId: claims.cfId, status: 'denied' })
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
      console.log('not metaadmin\n');
      //Not metaadmin, so we this post must be made from CF Account Request
      //Get and store the cf document record id in the claims object
      admin.auth().getUser(claims.sub)
        .then((user) => {
          console.log('got user\n');
          admin.firestore().collection('communityFoundations').where('personal_email', '==', user.email)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
              console.log('got cf!\n' );
                admin.auth().setCustomUserClaims(claims.sub, { cfId: doc.id, status: 'requested' })
                  .then(() => {
                  console.log('set cc!\n');
                    // Tell client to refresh token on user.
                    res.end(JSON.stringify({ status: 'success' }));
                  })
                  .catch((error) => {
                  console.log('failed cc!\n');

                    res.end(JSON.stringify({ status: error }));
                  });
                  console.log('after cc\n');
              });
            })
            .catch((error) => {
              res.end(JSON.stringify({ status: error }));
            });
        })
        .catch((error) => {
          res.end(JSON.stringify({ status: error }));
        });
        console.log('end of not metaadmin\n');
    }
  })
  .catch((error) => {
    console.log('NOOO at the end\n');
    res.end(JSON.stringify({ status: error }));
  });
});

app.listen(process.env.PORT);
// app.listen(9000, () => console.log('Listening on port 9000')); 	