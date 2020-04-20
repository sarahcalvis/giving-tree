const app = require('express')();
const admin = require('firebase-admin');
const serviceAccount = require("./secret/givingtree-cfs-firebase-adminsdk-grrpd-764871e22c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://givingtree-cfs.firebaseio.com"
});

admin.firestore().collection("grants").get()
  .then(snap => {
    snap.docs
      .forEach(doc => {
        const { status } = doc.data();
        if (status === 'expired') {
          doc.ref.update({ status: 'current' });
        }
      })
  })
  .then(() => {
    //console.log("success");
  })
  .catch((e) => {
    //console.log("failure " + e);
  });
//------------------------------------------------------------
//Script to set admin
//------------------------------------------------------------

// const uid = 'CFmOxVx6R8OWBMnZQoCfWhRAAEM2';

// admin.auth().setCustomUserClaims(uid, { admin: true })
// .then(() => {
//   console.log('Set admin for ' + uid);
// })
// .catch((error) => {
//   console.log('failed cc!');
// });



//------------------------------------------------------------
//Script to add status and cfId to accounts
//Add the uids into this array and then run this file
//------------------------------------------------------------

// const uids = ['QJbnn1tU1EUCnllEGBAW4ZuLMG42', 'fn7ctzdQSRaDnSy3sd3qtnoHOnH2', 'nGhCVWTti7RFjVxOjbjwNgjxkWi1', 'raVpBAbRpXUscVkcxC3KXo1KZm22'];

// uids.forEach((uid) => {
//   admin.auth().getUser(uid)
//     .then((user) => {
//       admin.firestore().collection('communityFoundations').where('personal_email', '==', user.email)
//         .get()
//         .then(function (querySnapshot) {
//           querySnapshot.forEach(function (doc) {
//             admin.auth().setCustomUserClaims(uid, { cfId: doc.id, status: 'requested' })
//               .then(() => {
//                 console.log('Set claims for ' + uid);
//               })
//               .catch((error) => {
//                 console.log('failed cc!');
//               });
//           });
//         })
//         .catch((error) => {
//           console.log("Err err err " + error);
//         });
//     })
//     .catch((error) => {
//       console.log("Err err err err " + error);
//     });
// });

//------------------------------------------------------------
//Script to delete accounts
//Add the uids into this array and then run this file
//------------------------------------------------------------

// const uidsDelete = [];

// uidsDelete.forEach((uid) => {
//   admin.auth().deleteUser(uid)
//     .then(function () {
//       console.log('Successfully deleted user');
//     })
//     .catch(function (error) {
//       console.log('Error deleting user:', error);
//     });
// });




//------------------------------------------------------------
//Script to delete all requested CFs
//------------------------------------------------------------

// admin.firestore().collection("communityFoundations").where('status', '==', 'requested')
//   .get()
//   .then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//       admin.firestore().collection("communityFoundations").doc(doc.id).delete().then(function () {
//         console.log("Document successfully deleted!");
//       }).catch(function (error) {
//         console.error("Error removing document: ", error);
//       });
//     });
//   });