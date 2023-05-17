import { getAuth } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import { app } from '/src/firebase/firebase-config.js';

import { getStorage, ref as imageRef, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';

let userID = '';
const auth = getAuth(app);
auth.onAuthStateChanged((user) => {
  if (user) {
    userID = user.uid;
    const storage = getStorage();
    const image = imageRef(storage, `Profile Pictures/Staffs/${user.uid}.png`);
    getDownloadURL(image).then((url) => {
      const profileImageHolder = document.getElementById('end__dashboard-avatar');
      const img = document.createElement('img');
      img.src = url;
      profileImageHolder.appendChild(img);
    });
    const database = getDatabase();
    const info = ref(database, `User Info/Staff/${user.uid}`);
    onValue(info, (snapshot) => {
      if (snapshot.exists()) {
        const details = snapshot.val();
        if (details.Gender === 'Male') {
          const greeting = document.getElementById('greeting');
          greeting.innerHTML = 'Hello Sir ';
          const firstName = document.createElement('span');
          firstName.innerHTML = details['Full Name']['First Name'];
          greeting.appendChild(firstName);
        } else if (details.Gender === 'Female') {
          const greeting = document.getElementById('greeting');
          greeting.innerHTML = "Hello Ma'am ";
          const firstName = document.createElement('span');
          firstName.innerHTML = details['Full Name']['First Name'];
          greeting.appendChild(firstName);
        }
      }
    });
  }
});
