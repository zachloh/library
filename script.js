// Create an array to store all book objects, myLibrary
// Prompt user for input
// Store user input as an object (use constructor function to create new instance)
// Create a function that adds the object to the array
// Display the books as a table
// Add a functionality to remove each book from the library
// Add a button to toggle read status

const form = document.querySelector('form');
const addBookButton = document.querySelector('#add-book-button');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readStatusCheckbox = document.querySelector('#read-status');
const tableBody = document.querySelector('tbody');

let myLibrary;

updateBookArray();
initializeTable(myLibrary);

form.addEventListener('submit', e => {
  e.preventDefault();
  const book = createBookObject(titleInput.value, authorInput.value, pagesInput.value, readStatusCheckbox.checked);
  addToLocalStorage(book);
  appendToTable(book);
});

function updateBookArray() {
  let existingBooks = JSON.parse(localStorage.getItem('books'));
  if (existingBooks === null) existingBooks = [];
  myLibrary = [...existingBooks];
}

function initializeTable(bookArray) {
  bookArray.forEach(book => appendToTable(book));
}

function appendToTable(bookObject) {
  const newRow = document.createElement('tr');
  for (let i = 0; i < 5; i++) {
    const newCell = document.createElement('td');
    if (i === 0) newCell.textContent = bookObject.title;
    if (i === 1) newCell.textContent = bookObject.author;
    if (i === 2) newCell.textContent = bookObject.pages;
    if (i === 3) newCell.textContent = bookObject.readStatus ? 'read' : 'not read';
    if (i === 4) newCell.textContent = 'Delete';
    newRow.appendChild(newCell);
    tableBody.appendChild(newRow);
  }
}

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function createBookObject(title, author, pages, checked) {
  return new Book(title, author, pages, checked);
}

function addToLocalStorage(bookObject) {
  myLibrary.push(bookObject);
  localStorage.setItem('books', JSON.stringify(myLibrary));
}