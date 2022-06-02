class BookApp {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    } return books;
  }

  static addBooks(book) {
    const books = BookApp.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = BookApp.getBooks();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static addBooksToList(book) {
    const list = document.querySelector('#bookList');

    const itemsList = document.createElement('li');

    itemsList.innerHTML = `
        <p>${book.title} by <span>${book.author}</span></p>
        <button id=${book.id} type="submit" class="remove">Remove</button>
        `;

    list.appendChild(itemsList);
  }

  static displayBooks() {
    const books = BookApp.getBooks();

    books.forEach((book) => BookApp.addBooksToList(book));
  }

  static deleteBook(target) {
    if (target.classList.contains('remove')) {
      target.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', BookApp.displayBooks);

const form = document.querySelector('#book-entry-form');

form.addEventListener('submit', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

  const book = new BookApp(title, author, id);

  BookApp.addBooksToList(book);
  BookApp.addBooks(book);
});

document.querySelector('#bookList').addEventListener('click', (e) => {
  BookApp.deleteBook(e.target);

  BookApp.removeBook(e.target.id);
});