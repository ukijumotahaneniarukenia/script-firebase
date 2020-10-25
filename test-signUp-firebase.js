async function main(inputEmail, inputPassword) {
  const firebase = require("firebase");

  const firebaseConfig = require("/home/aine/CredentialFirebase-消しちゃダメ絶対/firebaseConfig.json");

  firebase.initializeApp(firebaseConfig)

  console.log(firebase.auth().currentUser) // サインインしていないので、null

  let targetEmail = inputEmail
  let targetPassword = inputPassword

  // 形式チェックなど

  // https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
  await firebase.auth().createUserWithEmailAndPassword(targetEmail, targetPassword).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(errorCode)
    console.log(errorMessage)
  });


  console.log(firebase.auth().currentUser) // サインアップしたので、uidとれる
}

// 作成したプロジェクトのAuthenticationでユーザーが追加されていれば動作検証できる
main('unkounko@unko.com', 'unkounko')
