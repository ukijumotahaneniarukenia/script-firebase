const firebase = require("firebase");

const firebaseConfig = require("/home/aine/CredentialFirebase-消しちゃダメ絶対/firebaseConfig.json");

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

const mainCollection = db.collection("events")
mainCollection.get().then((mainQuerySnapshot) => {
  if(mainQuerySnapshot.docs.length <= 0){
    // such no maincollection
    console.log('such no maincollection')
  }
  mainQuerySnapshot.forEach((mainDocumnet) => {
    const mainDocumentId = mainDocumnet.id
    const mainCollectionData = mainDocumnet.data()
    console.log(mainDocumentId)
    console.log(JSON.stringify(mainCollectionData))
    const subCollection = mainCollection.doc(mainDocumentId).collection("eventUser")
    subCollection.get().then((subQuerySnapshot) => {
      if(subQuerySnapshot.docs.length <= 0){
        // such no subcollection
        console.log('such no subcollection')
      }
      subQuerySnapshot.forEach((subDocument) => {
        const subDocumentId = subDocument.id
        const subCollectionData = subDocument.data()
        console.log(subDocumentId)
        console.log(JSON.stringify(subCollectionData))
      })
    })
  });
});
