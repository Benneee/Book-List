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

// Event Listeners

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
    : (ui.addBookToTable(book), ui.showAlert('Book added successfully', 'success'), ui.clearFields());

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

  // Show an alert for book deletion by calling the class' showAlert method
  ui.showAlert('Book deleted successfully', 'success');

  e.preventDefault();
}
