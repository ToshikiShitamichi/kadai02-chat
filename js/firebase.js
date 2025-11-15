import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";;

const firebaseConfig = {
    apiKey: "AIzaSyDkU5HSGPA5HYJloeWhWsT8ipH-uicGcek",
    authDomain: "kadai02-chat.firebaseapp.com",
    databaseURL: "https://kadai02-chat-default-rtdb.firebaseio.com",
    projectId: "kadai02-chat",
    storageBucket: "kadai02-chat.firebasestorage.app",
    messagingSenderId: "567997887080",
    appId: "1:567997887080:web:285d4604cf04819b93c1dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
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