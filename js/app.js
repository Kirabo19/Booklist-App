const bookList = document.querySelector('#book-list');

class Book {
  static getBooks = () => {
    JSON.parse(localStorage.getItem('books')) === null ? this.books = [] : this.books = JSON.parse(localStorage.getItem('books'));
    return this.books;
  }

  static addBook = (title, author) => {
    const books = this.getBooks();
    const book = {
      id: 0,
      title: '',
      author: ''
    };

    if (title !== '' || author !== '') {
      book.title = title;
      book.author = author;
      book.id = books.length + 1;
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
      titleInput.value = '';
      authorInput.value = '';
      this.displayBooks();
    }
  }

  static removeBook = (id) => {
    const books = JSON.parse(localStorage.getItem('books')).filter((book) => book.id !== +id);
    localStorage.setItem('books', JSON.stringify(books));
    this.displayBooks();
  }

  static displayBooks = () => {
    bookList.innerHTML = '';
    const books = this.getBooks();
    books.map((book) => {
      const bookItem = `
        <li>
          <p>${book.title} by <span>${book.author}</span></p>
          <button id=${book.id} type="button" class="remove">Remove</button>
         </li>
      `;
      
      bookList.innerHTML += bookItem;
    });
    return bookList;
  }

  static deleteBook(target) {
    if (target.classList.contains('remove')) {
      target.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', Book.displayBooks());

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const btnAdd = document.getElementById('btnAdd');

btnAdd.addEventListener('click', () => {
  Book.addBook(titleInput.value, authorInput.value);

});

document.addEventListener('click', (e) => {
  const id = e.target.attributes.id.value;
  Book.removeBook(id);
});
