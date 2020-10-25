const firebase = require("firebase");

const firebaseConfig = require("/home/aine/CredentialFirebase-消しちゃダメ絶対/firebaseConfig.json");

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

db.collection("events").get().then((querySnapshot) => {
  querySnapshot.forEach((documnet) => {
    const documentId = documnet.id
    console.log(documentId)
    console.log(documnet.data())
  });
});
