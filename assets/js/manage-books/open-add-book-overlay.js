const addBookOverlay = document.getElementById('add-book__overlay');
const addBook = document.getElementById('bottom-control__add-book');
const closeButton = document.getElementById('close-button');
addBook.addEventListener('click', (e) => {
  addBookOverlay.style.display = 'block';
});
closeButton.addEventListener('click', (e) => {
  addBookOverlay.style.display = 'none';
});
