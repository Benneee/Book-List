// Two classes will be created here

// The book class
// This class is responsible for creating the book object

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// The UI Class
// This class contains all the methods we will use to manipulate the UI

class UI {
  // Add Book to Table
  addBookToTable(book) {
    const list = document.querySelector('#book-list');

    // Create the table-row element
    const row = document.createElement('tr');

    // Write into the DOM the expected values of the table
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">x</a></td>
    `;
    // Embed the list in a direct parent
    // console.log(row);
    list.appendChild(row);
  }

  // Show Alerts
  showAlert(message, className) {
    // Create HTML elements to display alerts just above the form
    // requirements: div, parent elements

    // Create div
    const div = document.createElement('div');

    // Add a class
    div.className = `alert ${className}`;

    // Add The Text of the message to the element
    div.appendChild(document.createTextNode(message));

    // Get the first parent element - the container
    const container = document.querySelector('.container');

    // Get the second parent element - the form
    const form = document.querySelector('#book-form');

    // So we insert the div into the DOM like so:
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  clearFields() {
    // Simply assign all the form values to empty strings
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  deletBook(target) {
    // The target in our case is the link that currently shows x when a new book is added
    // However, clicking just the x doesn't make any difference
    // We have to traverse the node till we get to the element that houses the book object
    // Hence, the parentElements being used

    target.className === 'delete' ? target.parentElement.parentElement.remove() : null;
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    books = localStorage.getItem('books') === null ? [] : JSON.parse(localStorage.getItem('books'));
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    // Loop through the books gotten from LS using forEach
    books.forEach(book => {
      // Since we already have a class method that adds books to table for us, we instantiate the UI class
      const ui = new UI();

      // Then summon the method in question and pass in the book object
      ui.addBookToTable(book);
    });
  }

  static addBook(book) {
    // Initalise the books object and setting it to the variable after getting it from Local Storage
    const books = Store.getBooks();

    books.push(book);

    // Set the new book entered by user in the LS
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    // Since we don't have an id for the book objects, what we can do is to target the isbn
    // First, we want to get the books back from LS
    const books = Store.getBooks();

    // Next, we want to loop through the books and ensure the book we want by using splice
    books.forEach((book, index) => {
      book.isbn === isbn ? books.splice(index, 1) : null;
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event Listeners

// The event listener to cause all the books to be displayed in the DOM
// This will be triggered by the DOMLoadEvent and we call the Store method
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// The addBookToTable event listener

const form = document.querySelector('#book-form');

form.addEventListener('submit', addBook);

// The method to add a book to the table
function addBook(e) {
  // Get the form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  // Validate form entries/submission
  title === '' || author === '' || isbn === ''
    ? ui.showAlert('Please fill in all fields', 'error')
    : (ui.addBookToTable(book), Store.addBook(book), ui.showAlert('Book added successfully', 'success'), ui.clearFields());

  e.preventDefault();
}

const bookList = document.querySelector('#book-list');

// booklist is the parent element holding the parent object

// The method to delete book from the list
bookList.addEventListener('click', deleteBook);

function deleteBook(e) {
  const ui = new UI();

  // Call the class method responsible for the delete action and pass in the target
  ui.deletBook(e.target);

  // Remove book from LS
  // First thing we want to do is get the book's isbn - that will be our ID for the book
  let isbn = e.target.parentElement.previousElementSibling.textContent;
  Store.removeBook(isbn);

  // Show an alert for book deletion by calling the class' showAlert method
  ui.showAlert('Book deleted successfully', 'success');

  e.preventDefault();
}
