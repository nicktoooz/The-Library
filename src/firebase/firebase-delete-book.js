//NOTE : DO NOT COMMIT!

const deleteBook = document.getElementById('delete-book');
const editBook = document.getElementById('edit-book');
const bookID = document.getElementById('book-id');
deleteBook.addEventListener('click', (e) => {
  e.preventDefault();
  //TODO : REMOVE BOOK FROM THE DATABASE
  console.log(bookID.innerHTML.substring(3));
});

editBook.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(document.getElementById('book-title').innerHTML);
});

//NOTE : DO NOT COMMIT!
