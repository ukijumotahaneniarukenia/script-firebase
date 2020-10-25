async function main(inputEmail, inputPassword) {
  const firebase = require("firebase");

  const firebaseConfig = require("/home/aine/CredentialFirebase-消しちゃダメ絶対/firebaseConfig.json");

  firebase.initializeApp(firebaseConfig)

  console.log(firebase.auth().currentUser) // サインインしていないので、null

  let targetEmail = inputEmail
  let targetPassword = inputPassword

  // 形式チェックなど

  // https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
  await firebase.auth().signInWithEmailAndPassword(targetEmail, targetPassword).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(errorCode)
    console.log(errorMessage)

  });

  console.log(firebase.auth().currentUser) // サインインしたので、uidとれる
}

// 作成したプロジェクトのAuthenticationでユーザー追加を事前に追加しておけば動作検証できる
main('hogehoge@hoge.com', 'hogehoge')
