const firebase = require("firebase");

const firebaseConfig = require("/home/aine/CredentialFirebase-消しちゃダメ絶対/firebaseConfig.json");

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

const targetCollectionNameList = ["event","eventUser"]
const prevDocument = undefined
let currentVisitCount = 0
let resultObject = []

// 雰囲気こんなかんじ
// 配列
function NNN(targetCollectionNameList, prevDocument, resultObject, currentVisitCount) {
  if(targetCollectionNameList.length === currentVisitCount){
    return
  }
  let targetCollection
  let targetCollectionName
  if (currentVisitCount === 0) {
    // 初回
    targetCollectionName = targetCollectionNameList[currentVisitCount]
    targetCollection = db.collection(targetCollectionName)
    resultObject = { targetCollectionName : [] }
  } else {
    // ２回目以降
    targetCollectionName = targetCollectionNameList[currentVisitCount]
    targetCollection = db.collection(targetCollectionName)
    resultObject = Object.assign(resultObject, { targetCollectionName : [] }) // ここで詰まりそう
  }
  currentVisitCount++
  targetCollection.get().then((targetQuerySnapshot) => {
    if(targetQuerySnapshot.docs.length <= 0){
      console.log('such no targetcollection')
      resultObject = Object.assign(resultObject, {})
      return
    }
    targetQuerySnapshot.forEach((targetDocumnet) => {
      const mainDocumentId = targetDocumnet.id
      const mainCollectionData = targetDocumnet.data()
       // 対象コレクション名をキーにして取得できた配列にpushするように修正
      resultObject = Object.assign(resultObject, JSON.parse({"DocumentId":JSON.stringify(mainDocumentId)}))
      resultObject = Object.assign(resultObject, JSON.parse({"DocumentData":JSON.stringify(mainCollectionData)}))
      return NNN(targetCollectionNameList, targetCollection.doc(mainDocumentId), resultObject, currentVisitCount)
    });
  });
}

// const mainCollection = db.collection("event")
// mainCollection.get().then((mainQuerySnapshot) => {
//   if(mainQuerySnapshot.docs.length <= 0){
//     // such no maincollection
//     console.log('such no maincollection')
//   }
//   mainQuerySnapshot.forEach((mainDocumnet) => {
//     const mainDocumentId = mainDocumnet.id
//     const mainCollectionData = mainDocumnet.data()
//     console.log(mainDocumentId)
//     console.log(JSON.stringify(mainCollectionData))
//     const subCollection = mainCollection.doc(mainDocumentId).collection("eventUser")
//     subCollection.get().then((subQuerySnapshot) => {
//       if(subQuerySnapshot.docs.length <= 0){
//         // such no subcollection
//         console.log('such no subcollection')
//       }
//       subQuerySnapshot.forEach((subDocument) => {
//         const subDocumentId = subDocument.id
//         const subCollectionData = subDocument.data()
//         console.log(subDocumentId)
//         console.log(JSON.stringify(subCollectionData))
//       })
//     })
//   });
// });
