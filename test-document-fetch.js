const firebase = require("firebase");

const firebaseConfig = require("/home/aine/CredentialFirebase-消しちゃダメ絶対/firebaseConfig.json");

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

const parentCollection = db.collection("events")
parentCollection.get().then((parentQuerySnapshot) => {
  if(parentQuerySnapshot.docs.length <= 0){
    // such no maincollection
    console.log('such no maincollection')
  }
  parentQuerySnapshot.forEach((parentDocumnet) => {
    const parentDocumentId = parentDocumnet.id
    const parentCollectionData = parentDocumnet.data()
    console.log(parentDocumentId)
    console.log(parentCollectionData)
    const childCollection = parentCollection.doc(parentDocumentId).collection("eventUser")
    childCollection.get().then((childQuerySnapshot) => {
      if(childQuerySnapshot.docs.length <= 0){
        // such no subcollection
        console.log('such no subcollection')
      }
      childQuerySnapshot.forEach((childDocument) => {
        const childDocumentId = childDocument.id
        const childCollectionData = childDocument.data()
        console.log(childDocumentId)
        console.log(childCollectionData)
      })
    })
  });
});
