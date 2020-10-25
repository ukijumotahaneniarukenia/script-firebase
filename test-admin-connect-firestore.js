const admin = require("firebase-admin");

// https://firebase.google.com/docs/firestore/quickstart?hl=ja
const serviceAccount = require("/home/aine/CredentialFirebase-消しちゃダメ絶対/my-cloud-doc-firebase-adminsdk-n2dds-c52fc3910c.json");

//アドミンユーザーのみ対応
//権限設定等が参照できる
const defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-cloud-doc.firebaseio.com"
});

// Auth関連
const defaultAuth = defaultApp.auth();

console.log(defaultApp)

// Database関連
const defaultDatabase = defaultApp.database();

console.log(defaultDatabase)
