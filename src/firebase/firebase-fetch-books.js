import { getDatabase, ref as bookRef, onValue } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';
import { getStorage, ref as imageRef, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js';

const database = getDatabase();
const booksRef = bookRef(database, 'Books');
const table = document.getElementsByTagName('tbody')[0]; // Assuming there is only one <tbody> element
const shelfSelect = document.getElementById('select-shelf');

const searchBooks = document.getElementById('search-books-form');
let search = '';
searchBooks.addEventListener('submit', (e) => {
  e.preventDefault(); //default action should not be taken as it normally would be.
  search = searchBooks.search_book.value; //search input value goes to global
  updateTable(shelfSelect.value, search);
});
searchBooks.addEventListener('input', (e) => {
  //this event fires whenever the user change the value of the <input> element
  setTimeout(() => {
    search = searchBooks.search_book.value; //search input value goes to global
    updateTable(shelfSelect.value, search); //this function is executed whenever you change the value of the <input> element
  }, 1000);
});

function updateTable(selectedShelf, title) {
  const regex = new RegExp(title, 'i');

  onValue(booksRef, (snapshot) => {
    if (snapshot.exists()) {
      const booksData = snapshot.val();
      table.innerHTML = '';

      for (const book in booksData) {
        const details = booksData[book];
        console.log((details.Shelf === selectedShelf || selectedShelf === '') && (regex.test(details.Title) || regex.test(book) || regex.test(details.Author)))
        if ((details.Shelf === selectedShelf || selectedShelf === '') && (regex.test(details.Title) || regex.test(book) || regex.test(details.Author))) {
          const row = document.createElement('tr');
          
          const bookIDCell = document.createElement('td');
          bookIDCell.innerHTML = book;
          row.appendChild(bookIDCell);

          const titleCell = document.createElement('td');
          titleCell.innerHTML = details.Title;
          row.appendChild(titleCell);

          const authorCell = document.createElement('td');
          authorCell.innerHTML = details.Author;
          row.appendChild(authorCell);

          const yearCell = document.createElement('td');
          yearCell.innerHTML = details.Year;
          row.appendChild(yearCell);

          const availabilityCell = document.createElement('td');
          const availabilityImage = document.createElement('img');

          if (details["Current Copies"] > 0) {
            availabilityImage.src = '/assets/img/manage-books-assets/success.png';
          } else {
            availabilityImage.src = '/assets/img/manage-books-assets/error.png';

          }
          availabilityCell.appendChild(availabilityImage);
          row.appendChild(availabilityCell);

          table.appendChild(row);

          // Add click event listener to row
          row.addEventListener('click', () => {
            document.querySelector('.table-content__preview').classList.add('active')
            const image_container = document.getElementById('book-cover-container');
            image_container.innerHTML = '';
            const image_gradient = document.createElement('div');
            image_gradient.setAttribute('class', 'image-gradient');
            image_container.appendChild(image_gradient);
            document.getElementById('book-title').innerHTML = details.Title;
            document.getElementById('book-id').innerHTML = `ID-${book}`;
            document.getElementById('book-author').innerHTML = details.Author;
            document.getElementById('book-year').innerHTML = details.Year;
            document.getElementById('book-genre').innerHTML = details.Genre;
            document.getElementById('book-shelf').innerHTML = details.Shelf;

            let description = details.Description.replace(/\u000A/g, '<br>') //New Line
            description = description.replace(/\u2022/g, '&#149;') //Bullet point
            
            document.getElementById('book-description').innerHTML = description;
            document.getElementById('book-language').innerHTML = details.Language;
            document.getElementById('book-publisher').innerHTML = details.Publisher;
            document.getElementById('book-isbn').innerHTML = details.ISBN;
            document.getElementById('isbn-label').innerHTML = "ISBN: "
            if (details["Current Copies"] > 0) {
              document.getElementById('availability-tag').src = '/assets/img/manage-books-assets/available-tag.png'
            } else {
              document.getElementById('availability-tag').src = '/assets/img/manage-books-assets/not-available-tag.png'
  
            }
            
            document.getElementById('table-content__preview__controls').style.display = 'flex';

            const storage = getStorage();
            const image = imageRef(storage, 'Book Covers/' + book + '.png');

            getDownloadURL(image)
              .then((url) => {
                const imageHolder = document.getElementById('book-cover-container');
                const img = document.createElement('img');
                img.src = url;
                imageHolder.appendChild(img);
              })
              .catch((error) => {
                const imageHolder = document.getElementById('book-cover-container');
                const img = document.createElement('img');
                img.setAttribute('id', 'no-image');
                img.src = '/assets/img/manage-books-assets/no-image.png';
                imageHolder.appendChild(img);
              });
          });
        }
      }
    }
  });
}

// Initial table update based on the selected shelf
updateTable(shelfSelect.value);

// Event listener for shelf selection change
shelfSelect.addEventListener('change', (event) => {
  const selectedShelf = event.target.value;
  updateTable(selectedShelf, search); //after searching, the value is still be there unless the user submitted an empty form, all of the records will display
});
