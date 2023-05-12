let bookID = '';
let title = '';
let author = '';
let isbn = '';
let genre = '';
let publisher = '';
let publicationYear = '';
let language = '';
let shelf = '';
let description = '';
let coverImage = null;
const shelfChooser = document.getElementById('shelf-chooser');
shelfChooser.addEventListener('change', (e) => {
  shelf = shelfChooser.value;
  console.log(shelf);
});
const imageChooser = document.getElementById('add-image');
const deleteImageBtn = document.getElementById('delete-image');
imageChooser.addEventListener('click', (e) => {
  e.preventDefault();
  var input = document.getElementById('upload-input');

  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = function (event) {
    var file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      var reader = new FileReader();
      reader.onload = function () {
        var image = document.createElement('img');
        image.src = reader.result;
        coverImage = reader.result;
        var container = document.getElementById('image-upload');
        container.innerHTML = '';
        container.appendChild(image);
        var img = document.getElementById('add-image-icon');
        img.src = '/assets/img/manage-books-assets/change.svg';
        deleteImageBtn.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      console.log('Please select a valid image file.');
    }
  };
});

deleteImageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  var container = document.getElementById('image-upload');
  container.innerHTML = '';
  var img = document.getElementById('add-image-icon');
  img.src = '/assets/img/manage-books-assets/add.svg';
  deleteImageBtn.style.display = 'none';
  coverImage = null;
});

// TODO: Add to firebase
const upload = document.getElementById('add-book-form');
upload.addEventListener('submit', (e) => {
  e.preventDefault();
  bookID = upload.book_id.value;
  title = upload.title.value;
  author = upload.author.value;
  isbn = upload.isbn.value;
  genre = upload.genre.value;
  publisher = upload.publisher.value;
  publicationYear = upload.year.value;
  language = upload.language.value;
  // shelf
  description = upload.description.value;
  // coverImage

  console.log('Book ID: ', bookID);
  console.log('Title: ', title);
  console.log('Author: ', author);
  console.log('ISBN: ', isbn);
  console.log('Genre: ', genre);
  console.log('Publisher: ', publisher);
  console.log('Publication Year: ', publicationYear);
  console.log('Language: ', language);
  console.log('Shelf: ', shelf);
  console.log('Description: ', description);
  console.log('Cover: ', coverImage);
});
