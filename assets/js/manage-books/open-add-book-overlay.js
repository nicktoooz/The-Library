const addBookOverlay = document.getElementById('add-book__overlay');
const addBook = document.getElementById('bottom-control__add-book');
const closeButton = document.getElementById('close-button');
addBook.addEventListener('click', (e) => {
  addBookOverlay.style.display = 'block';
});
closeButton.addEventListener('click', (e) => {
  addBookOverlay.style.display = 'none';
  const forms = document.getElementsByTagName('form');
  for (let i = 0; i < forms.length; i++) {
    forms[i].reset();
  }
  var container = document.getElementById('image-upload');
  container.innerHTML = '';
  document.getElementById('add-image-icon').src = '/assets/img/manage-books-assets/add.svg';
  document.getElementById('delete-image').style.display = 'none';
  image = null;
});
