let isStaff = false;
function changePane() {
  switch (isStaff) {
    case true:
      document.getElementById('student-social').style.display = 'none';
      document.getElementById('student-sign-up-form').style.display = 'flex';
      document.querySelector('.preview-panel').classList.remove('student');
      document.querySelector('.preview-panel').classList.add('staff');
      document.getElementById('change-user').innerHTML = 'Switch as Student';
      isStaff = false;
      console.log('Staff');
      break;
    case false:
      document.getElementById('student-social').style.display = 'none';
      document.getElementById('student-sign-up-form').style.display = 'flex';

      document.querySelector('.preview-panel').classList.remove('staff');
      document.querySelector('.preview-panel').classList.add('student');
      document.getElementById('change-user').innerHTML = 'Switch as Staff';

      isStaff = true;
      console.log('Student');
      break;
  }

  const forms = document.getElementsByTagName('form');
  for (let i = 0; i < forms.length; i++) {
    forms[i].reset();
  }
}
