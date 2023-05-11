const searchBooks = document.getElementById('search-books-form');
const selectCategory = document.getElementById('select-category');
let book = '';
let selectedCategory = '';

searchBooks.addEventListener('submit', (e) => {
  e.preventDefault();
  book = searchBooks.search_book.value;
  console.log('Submitted: ', book, ':', selectedCategory);
});

selectCategory.addEventListener('change', (e) => {
  if (selectCategory.value !== '') {
    selectedCategory = selectCategory.value;
    console.log('Submitted: ', book, ':', selectedCategory);
  }
});
