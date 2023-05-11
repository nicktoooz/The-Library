import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
const auth = getAuth();
const login = document.getElementById('login-form');

login.addEventListener('submit', (e) => {
  e.preventDefault();
  let email = login.emailAddress.value;
  let password = login.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //TODO : First time log-in
      //Minor checking
      //SetValue to remove minor checking if the user logged in again
      //Redirect to Dashboard
      window.location.href = '/pages/dashboard.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/wrong-password':
          document.getElementById('password').style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
          break;
        case 'auth/user-not-found':
          document.getElementById('email-address').style.backgroundColor = 'rgba(255, 0, 0, 0.5)';

        default:
          break;
      }
    });
});
