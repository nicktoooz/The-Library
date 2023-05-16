import { getDatabase, ref, set, push, get } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js';

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
let image = null;

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
  input.setAttribute('accept', 'image/'); //SETTING MIME TYPE FOR FILE CHOOSER
  input.click();
  input.onchange = (event) => {
    var file = event.target.files[0]; //FETCHING FILES FROM <input type"file"> tag

    if (file && file.type.startsWith('image/')) {
      if (file.type !== 'image/png') {
        var reader = new FileReader();
        reader.onload = () => {
          var img = new Image();
          img.onload = () => {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              var convertedFile = new File([blob], 'image.png', { type: 'image/png' });
              // Use the convertedFile variable as needed
              // e.g., assign it to the image variable or perform other operations
              image = convertedFile;

              var localImage = document.createElement('img');
              localImage.src = reader.result;
              var container = document.getElementById('image-upload');
              container.innerHTML = '';
              container.appendChild(localImage);
              var img = document.getElementById('add-image-icon');
              img.src = '/assets/img/manage-books-assets/change.svg';
              deleteImageBtn.style.display = 'block';
            }, 'image/png');
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        // The file is already in PNG format, use it directly
        // Assign it to the image variable or perform other operations
        image = file;

        var localImage = document.createElement('img');
        localImage.src = URL.createObjectURL(file);
        var container = document.getElementById('image-upload');
        container.innerHTML = '';
        container.appendChild(localImage);
        var img = document.getElementById('add-image-icon');
        img.src = '/assets/img/manage-books-assets/change.svg';
        deleteImageBtn.style.display = 'block';
      }
    } else {
      console.log('Please select a valid image file.');
      image = null;
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
  image = null;
});

const upload = document.getElementById('add-book-form');
upload.addEventListener('submit', async (e) => {
  e.preventDefault();
  bookID = upload.book_id.value;
  title = upload.title.value;
  author = upload.author.value;
  isbn = upload.isbn.value;
  genre = upload.genre.value;
  publisher = upload.publisher.value;
  publicationYear = upload.year.value;
  language = upload.language.value;
  shelf = upload.shelf_chooser.value;
  description = upload.description.value;

  const database = getDatabase(); //initialise RTDB
  const reference = ref(database, 'Books/'); //MAKE REFERENCE

  const books = ref(database, 'Books/' + bookID); //FETCH THE BOOK FROM THE DATABASE
  get(books).then((snapshot) => {
    if (snapshot.exists()) {
      //CHECK IF IT ALREADY EXIST, THROW AN ERROR
      document.getElementById('callback-notification__title').innerHTML = 'Opps!';
      document.getElementById('callback-notification__description').innerHTML = 'It seems that this book is already in the database.';
      document.getElementById('status-image__content').src = '/assets/img/manage-books-assets/error.png';
      document.querySelector('.callback-notification').classList.add('active');
      setTimeout(() => {
        document.querySelector('.callback-notification').classList.remove('active');
      }, 3000);
    } else {
      //REGISTER THE BOOKS
      set(books, {
        'Book ID': bookID,
        Title: title,
        Author: author,
        ISBN: isbn,
        Genre: genre,
        Publisher: publisher,
        Year: publicationYear,
        Language: language,
        Shelf: shelf,
        Description: description,
        isAvailable: true,
      })
        .then(async () => {
          //ADD SUCCESSFUL CALLBACK 'Meaning, no duplicate'
          if (image) {
            //CHECK IF THE USER UPLOADED AN IMAGE
            if (image.type.startsWith('image/')) {
              //CHECK IF THE MIME TYPE IS IMAGE
              const storage = getStorage();
              const storageReference = storageRef(storage, `Book Covers/${bookID}.${image.name.split('.').pop()}`);

              await uploadBytes(storageReference, image)
                .then(() => {
                  var container = document.getElementById('image-upload');
                  container.innerHTML = '';
                  console.log('Upload successful');
                })
                .catch((error) => {
                  console.log('Upload error:', error);
                });
            } else {
              console.log('Invalid file type. Please select a valid image file.');
            }
          }
          //DISPLAY THE SUCCESSFUL CALLBACK
          document.getElementById('callback-notification__title').innerHTML = 'Success';
          document.getElementById('callback-notification__description').innerHTML = 'The book was registered to the database.';
          document.getElementById('status-image__content').src = '/assets/img/manage-books-assets/success.png';
          document.querySelector('.callback-notification').classList.add('active');
          clearForms();
          const addBookOverlay = document.getElementById('add-book__overlay');
          addBookOverlay.style.display = 'none';
          deleteImageBtn.style.display = 'none';
          document.getElementById('add-image-icon').src = '/assets/img/manage-books-assets/add.svg';
          setTimeout(() => {
            document.querySelector('.callback-notification').classList.remove('active');
          }, 3000);
        })
        .catch((error) => {
          //THROW AN ERROR
          //DISPLAY THE ERROR MESSAGE
          document.getElementById('callback-notification__title').innerHTML = 'Opps!';
          document.getElementById('callback-notification__description').innerHTML = 'Something went wrong while registering this book.';
          document.getElementById('status-image__content').src = '/assets/img/manage-books-assets/error.png';
          document.querySelector('.callback-notification').classList.add('active');
          setTimeout(() => {
            document.querySelector('.callback-notification').classList.remove('active');
          }, 3000);
        });
    }
  });
});

function clearForms() {
  const forms = document.getElementsByTagName('form');
  for (let i = 0; i < forms.length; i++) {
    forms[i].reset();
  }
}
