// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { push, ref, set } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABnHXZwjW4Tyy-kNL8zevPmidxrLIHxBY",
    authDomain: "valo-adda.firebaseapp.com",
    projectId: "valo-adda",
    storageBucket: "valo-adda.firebasestorage.app",
    messagingSenderId: "393470995392",
    appId: "1:393470995392:web:e39273cf0ba35df3cc7625"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function writeUserData(name, email, message) {
    const userRef = push(ref(db, "contacts"));

    set(userRef, {
        name: name,
        email: email,
        message: message
    }).then(() => {
        const paragraph = document.createElement("p");
        paragraph.textContent = `Name: ${name} | Email: ${email} | Message: ${message}`;
        document.getElementById("details").appendChild(paragraph);
    }).catch((error) => {
        console.error("Data could not be saved:", error);
    });
}

window.writeUserData = writeUserData;
