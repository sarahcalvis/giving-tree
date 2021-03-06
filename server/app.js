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
});

app.get('/updateExpirations', (req, res) => {
  try {
    admin.firestore().collection("grants").get()
      .then(snap => {
        snap.docs
          .forEach(doc => {
            const { date_deadline, goal_amt, money_raised } = doc.data();
            if (Date.now() > (Number(date_deadline['seconds']) * 1000) || money_raised >= goal_amt) {
              doc.ref.update({ status: 'expired' });
            }
          })
      })
      .then(() => {
        res.status(200).send(JSON.stringify({ status: 'success' }));
      })
      .catch((e) => {
        res.status(400).send(JSON.stringify({ status: 'failed to update grant expirations', error: e }));
      });
  } catch (e) {
    res.status(400).send(JSON.stringify({ status: 'failed to update grant expirations', error: e }));
  }
});

//Metaadmin Endpoint
app.post('/updateCf', (req, res) => {

  // Get the ID token passed.
  const idToken = req.body.idToken;
  const cfEmail = req.body.cfEmail;
  const cfStatus = req.body.cfStatus;

  // Verify the ID token and decode its payload.
  admin.auth().verifyIdToken(idToken)
    .then((claims) => {

      //Check if metaadmin
      if (typeof claims.admin !== 'undefined' && claims.admin) {
        //Check that cfEmail and cfStatus were provided in request
        if (typeof cfEmail !== 'undefined' && typeof cfStatus !== 'undefined'
          && cfEmail !== '' && cfStatus !== '') {
          //Get the CF User and update their permissions
          admin.auth().getUserByEmail(cfEmail)
            .then((user) => {
              if (typeof user.customClaims.cfId !== 'undefined') {
                admin.auth().setCustomUserClaims(user.uid, { cfId: user.customClaims.cfId, status: cfStatus })
                  .then(function () {
                    // Tell client to refresh token on user.
                    res.send(JSON.stringify({ status: 'success' }));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify({ status: error.message }));
                  });
              }
              else {
                res.send(JSON.stringify({ status: 'ERROR: Could not retrieve cfId from CF custom claims.' }));
              }
            })
            .catch((error) => {
              res.send(JSON.stringify({ status: error.message }));
            });
        }
        else {
          res.send(JSON.stringify({ status: 'ERROR: Invalid params' }));
        }
      }
      else {
        res.send(JSON.stringify({ status: 'ERROR: Not metaadmin' }));
      }
    })
    .catch((error) => {
      res.send(JSON.stringify({ status: error.message }));
    });

});

app.post('/requestCf', (req, res) => {

  // Get the ID token passed.
  const idToken = req.body.idToken;

  // Verify the ID token and decode its payload.
  admin.auth().verifyIdToken(idToken).then((claims) => {
    //Get and store the cf document record id in the claims object
    admin.auth().getUser(claims.sub)
      .then((user) => {
        admin.firestore().collection('communityFoundations').where('personal_email', '==', user.email)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              admin.auth().setCustomUserClaims(claims.sub, { cfId: doc.id, status: 'requested' })
                .then(() => {
                  // Tell client to refresh token on user.
                  res.status(201).json(JSON.stringify({ status: 'success' }));
                })
                .catch((error) => {

                  res.status(401).json(JSON.stringify({ status: error.message }));
                });
            });
          })
          .catch((error) => {
            res.status(402).json(JSON.stringify({ status: error.message }));
          });
      })
      .catch((error) => {
        res.status(403).json(JSON.stringify({ status: error.message }));
      });
  })
    .catch((error) => {
      res.status(405).json(JSON.stringify({ status: error.message }));
    });
});

app.listen(process.env.PORT);