import { getAuth } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import { app } from '/src/firebase/firebase-config.js';

const auth = getAuth(app);
const logout = document.getElementById('logout-button');
const logoutExtend = document.getElementById('logout-button-extend');
logout.addEventListener('click', (e) => {
  auth
    .signOut()
    .then(() => {
      window.location.replace('/pages/login.html');
    })
    .catch((error) => {});
});
logoutExtend.addEventListener('click', (e) => {
  auth
    .signOut()
    .then(() => {
      window.location.replace('/pages/login.html');
    })
    .catch((error) => {});
});
