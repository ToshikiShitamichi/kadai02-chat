import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";;
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import firebaseConfig from "./api.js"  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// データベース関係
// Initialize Realtime Database and get a reference to the serv ice
const database = getDatabase(app);

const db = getDatabase();
const dbRef = ref(db, 'test');

$("#send").on("click", function () {
    const newPostRef = push(dbRef);
    const msg = {
        html: quill.root.innerHTML,
    }
    set(newPostRef, msg)
    quill.setText('');
});

onChildAdded(dbRef, function (data) {
    const html = data.val().html;
    let h = '<div class="chat-msg">' + html + '</div><hr>'
    $(".chat-list").append(h);
})

// 認証関係
const provider = new GoogleAuthProvider();
const auth = getAuth();
signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
