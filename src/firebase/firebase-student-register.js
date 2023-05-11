import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

let studentNumber = '';
let firstName = '';
let middleName = '';
let lastName = '';
let address = '';
let age = '';
let course = '';
let phoneNumber = '';
let gender = '';
let email_address = '';
let password = '';

const database = getDatabase();
const auth = getAuth();

//fetch the form id
const signUp = document.getElementById('student-sign-up-form');
signUp.addEventListener('submit', (e) => {
  e.preventDefault();
  //fetch all the user data
  studentNumber = signUp.student_number.value;
  firstName = signUp.first_name.value;
  middleName = signUp.middle_name.value;
  lastName = signUp.last_name.value;
  address = signUp.address.value;
  age = signUp.age.value;
  course = signUp.course.value;
  phoneNumber = signUp.phone_number.value;
  gender = signUp.gender.value;
  //move on to the next form
  document.getElementById('student-sign-up-form').style.display = 'none';
  document.getElementById('student-social').style.display = 'flex';

  //fetch the new form id
  const student_social = document.getElementById('student-social');
  student_social.addEventListener('submit', (e) => {
    e.preventDefault();
    email_address = student_social.email_address.value;
    password = student_social.password.value;
    const cpassword = student_social.confirm_password.value;
    if (password === cpassword) {
      // Create a new Date object
      var currentDate = new Date();

      // Extract the individual components
      var year = currentDate.getFullYear(); // 4-digit year
      var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Month (zero-based index, so add 1)
      var day = ('0' + currentDate.getDate()).slice(-2); // Day of the month
      var hours = ('0' + currentDate.getHours()).slice(-2); // Hours
      var minutes = ('0' + currentDate.getMinutes()).slice(-2); // Minutes
      var seconds = ('0' + currentDate.getSeconds()).slice(-2); // Seconds

      // Create the formatted date string
      var formattedDate = year + '-' + month + '-' + day + ':' + hours + ':' + minutes + ':' + seconds;

      createUserWithEmailAndPassword(auth, email_address, password)
        .then((userCredential) => {
          //fetch uid
          const uid = userCredential.user.uid;
          //push data to rtdatabase
          set(ref(database, 'User Info/Students/' + uid), {
            'Student Number': studentNumber,
            'Full Name': {
              'First Name': firstName,
              'Middle Name': middleName,
              'Last Name': lastName,
            },
            Address: address,
            Age: age,
            Course: course,
            'Phone Number': phoneNumber,
            Gender: gender,
            Role: 'Student',
            'Date Created': formattedDate,
          })
            .then(() => {
              //callback
              window.location.href = '/index.html';
              console.log('Success');
            })
            .catch((error) => {
              console.error('Failed');
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      console.log('Password must match');
    }
  });
});
