// login.js
export function login() {
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Use Firebase Authentication to authenticate user
    auth
      .signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        // Successfully logged
  