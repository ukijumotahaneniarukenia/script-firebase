const admin = require('firebase-admin');
const fs = require("fs");

// https://firebase.google.com/docs/firestore/quickstart?hl=ja
const serviceAccount = require('Credentails.json');

//アドミンユーザーのみ対応
//権限設定等などメタ情報を取得できる
const defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://XXX.firebaseio.com'
});

async function main(outputFileName) {
    const authUserList = await defaultApp.auth().listUsers()
            .then((usersInfoList) => {
                const resultList = []
                const usersList = usersInfoList.users
                usersList.map((user) => {
                    // 他にもいろいろ取得できるフィールドはたくさんあったが、随時追加
                    const userInfo = {
                        uid: user.uid,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        disabled: user.disabled,
                        lastSignInTime: user.metadata.lastSignInTime,
                        creationTime: user.metadata.creationTime,
                    }
                    resultList.push(userInfo)
                })
                return resultList
            })
        // ファイル出力
        fs.writeFile(outputFileName, JSON.stringify(authUserList), (error, data) => {
            if (error) {
                console.log(error)
            }
        })
}

main('auth-user-list.json')
