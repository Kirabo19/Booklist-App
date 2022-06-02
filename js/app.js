class Book {
  constructor(title, author){
    this.title = title;
    this.author = author;
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
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Book.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static addBooksToList(book) {
    const list = document.querySelector('#books-list');

    const itemsList = document.createElement('li');

    itemsList.innerHTML = `
        <p>${book.title} by <span>${book.author}</span></p>
        <button id=${book.title} type="submit" class="remove">Remove</button>
        `;

    list.appendChild(itemsList);
  }

  static displayBooks() {
    const books = Book.getBooks();

    books.forEach((book) => Book.addBooksToList(book));
  }

  static deleteBook(target) {
    if (target.classList.contains('remove')) {
      target.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', Book.displayBooks);

const form = document.querySelector('#books-form');

// const btnAdd = document.querySelector('#add-btn');
form.addEventListener('submit', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  // const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

  const book = new Book(title, author);

  Book.addBooksToList(book);
  Book.addBooks(book);
});

document.querySelector('#books-form').addEventListener('click', (e) => {
  Book.deleteBook(e.target);

  Book.removeBook(e.target.title);
});

