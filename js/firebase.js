import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";;
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import firebaseConfig from "./api.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 認証関係
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// 現在ログイン中のユーザーを保持する変数
let currentUser = null;

// ナビバーのユーザーアイコンを書き換える
function renderUser(user) {
    const $userIcon = $("#user-icon");

    if (!user) {
        // 未ログイン時：デフォルトのアイコンに戻す
        $userIcon.html('<span class="material-symbols-outlined">person</span>');
        return;
    }

    const userName = user.displayName || "No name";
    const userIcon = user.photoURL || "img/default-icon.png";

    console.log("User:", userName, userIcon);

    // ナビバーのアイコンを差し替え
    $userIcon.html(
        `<img class="user-icon" src="${userIcon}">`
    );
}

// Google ポップアップでログイン
function signInWithGooglePopup() {
    return signInWithPopup(auth, provider).catch((error) => {
        console.error("Google ログインエラー:", error);
        alert("Google ログインに失敗しました");
    });
}

// ログイン状態の監視
onAuthStateChanged(auth, (user) => {
    console.log("onAuthStateChanged:", user);
    currentUser = user;

    if (user) {
        // ログイン済み
        renderUser(user);
    } else {
        // 未ログイン → デフォルトアイコンにしてから、ポップアップ表示
        renderUser(null);
        signInWithGooglePopup();
    }
});

// データベース関係
// Initialize Realtime Database and get a reference to the serv ice
const database = getDatabase(app);

const db = getDatabase();
const dbRef = ref(db, 'test');

$("#send").on("click", function () {
    const newPostRef = push(dbRef);
    const msg = {
        uI: currentUser.photoURL,
        uN: currentUser.displayName,
        date: new Date().getHours() + ":" + new Date().getMinutes(),
        html: quill.root.innerHTML,
    };
    set(newPostRef, msg)
    quill.setText('');
});

onChildAdded(dbRef, function (data) {
    const sendUserIcon = data.val().uI
    const sendUserName = data.val().uN;
    const sendDate = data.val().date;
    const html = data.val().html;
    let h = '<div class="chat-msg"><img class="user-icon" src="' + sendUserIcon + '">' + sendUserName + sendDate + html + '</div><hr>'
    $(".chat-list").append(h);
})
