import { getDatabase, ref as bookRef, onValue } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';
import { getStorage, ref as imageRef, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js';

const database = getDatabase();
const booksRef = bookRef(database, 'Books');
const table = document.getElementsByTagName('tbody')[0]; // Assuming there is only one <tbody> element
const shelfSelect = document.getElementById('select-shelf');

function updateTable(selectedShelf) {
  onValue(booksRef, (snapshot) => {
    if (snapshot.exists()) {
      const booksData = snapshot.val();
      table.innerHTML = '';

      const bookKeys = Object.keys(booksData).reverse(); // Reverse the keys
      for (const book of bookKeys) {
        const details = booksData[book];
        if (details.Shelf === selectedShelf || selectedShelf == '') {
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

          if (details.isAvailable == true) {
            availabilityImage.src = '/assets/img/manage-books-assets/success.png';
          } else {
            availabilityImage.src = '/assets/img/manage-books-assets/error.png';
          }
          availabilityCell.appendChild(availabilityImage);
          row.appendChild(availabilityCell);

          table.appendChild(row);

          // Add click event listener to row
          row.addEventListener('click', () => {
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
            document.getElementById('book-description').innerHTML = details.Description;
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
  updateTable(selectedShelf);
});
