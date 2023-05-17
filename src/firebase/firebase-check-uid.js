import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

import { app } from '/src/firebase/firebase-config.js';

const auth = getAuth(app);

auth.onAuthStateChanged((user) => {
  if (user) {
    const database = getDatabase();
    const roleRef = ref(database, `User Info/Staff/${user.uid}/Role`);
    get(roleRef)
      .then((snapshot) => {
        if (!(snapshot.exists() && snapshot.val() === 'Admin')) {
          signOut(auth)
            .then(() => {
              window.location.replace('/pages/login.html');
              console.log('Piss OFF!');
            })
            .catch((error) => {
              console.log('Sign out error:', error);
            });
        }
      })
      .catch((error) => {
        console.log('Data fetching error:', error);
      });
  } else {
    window.location.replace('/pages/login.html');
  }
});
