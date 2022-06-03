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

<<<<<<< HEAD
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
=======
  static removeBook(title) {
    const books = Book.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static addBooksToList(book) {
    const list = document.querySelector('#book-list');

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
>>>>>>> 70cc3d0f83ab3cd7219067ff9a242c5f7cb96227
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

<<<<<<< HEAD
});

document.addEventListener('click', (e) => {
  const id = e.target.attributes.id.value;
  Book.removeBook(id);
=======
  const book = new Book(title, author);
  
  Book.addBooksToList(book);
  Book.addBooks(book);
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  Book.deleteBook(e.target);

  Book.removeBook(e.target.title);
>>>>>>> 70cc3d0f83ab3cd7219067ff9a242c5f7cb96227
});
