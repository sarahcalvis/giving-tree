const app = require('express')();
const admin = require('firebase-admin');
const serviceAccount = require("./secret/givingtree-cfs-firebase-adminsdk-grrpd-764871e22c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://givingtree-cfs.firebaseio.com"
});


//Script to add status and cfId to accounts
//Add the uids into this array and then run this file
const uids = ['0000','00000'];

uids.forEach((uid) => {
  admin.auth().getUser(uid)
    .then((user) => {
      console.log('uid: ' + uid + ' \n');
      admin.firestore().collection('communityFoundations').where('personal_email', '==', user.email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log('got cf!\n');
            admin.auth().setCustomUserClaims(uid, { cfId: doc.id, status: 'requested' })
              .then(() => {
                console.log('set cc!\n');
              })
              .catch((error) => {
                console.log('failed cc!\n');
              });
            console.log('after cc\n');
          });
        })
        .catch((error) => {
          console.log("Err err err " + error);
        });
    })
    .catch((error) => {
      console.log("Err err err err " + error);
    });

});