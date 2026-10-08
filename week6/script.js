// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
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

console.log(db);






function writeUserData(userId, fname, lname, age, gender, marital_status, occupation, nationality, height, weight, email) {
    set(ref(db, 'users/' + userId), {
        first_name: fname,
        last_name: lname,
        age: age,
        gender: gender,
        marital_status: marital_status,
        occupation: occupation,
        nationality: nationality,
        height: height,
        weight: weight,
        email: email,
    });
}

writeUserData(1, "John", "Doe", 30, "Male", "Single", "Engineer", "American", 180, 75, "john@example.com");
writeUserData(2, "Jane", "Smith", 28, "Female", "Married", "Doctor", "British", 165, 60, "jane@example.com");
writeUserData(3, "Alice", "Johnson", 35, "Female", "Single", "Teacher", "Canadian", 170, 65, "alice@example.com");
writeUserData(4, "Bob", "Brown", 40, "Male", "Married", "Lawyer", "Australian", 175, 80, "bob@example.com");
writeUserData(5, "Charlie", "Davis", 32, "Male", "Single", "Designer", "New Zealander", 178, 70, "charlie@example.com");

function readUserData(userId) {
    const dbRef = ref(db, "users");
    get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.key === userId.toString()) {
                const userData = childSnapshot.val();
                console.log("User Data for ID " + userId + ": ", userData);
            }
        });
    }).catch((error) => {
        console.error("Error reading user data: ", error);
    });
}
window.readUserData = readUserData;

