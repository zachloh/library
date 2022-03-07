const form = document.querySelector('form');
const addBookButton = document.querySelector('#add-book-button');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readStatusCheckbox = document.querySelector('#read-status');
const tableBody = document.querySelector('tbody');
const message = document.querySelector('.add-book-container p');

let myLibrary;

updateBookArray();
initializeTable(myLibrary);

form.addEventListener('submit', e => {
  e.preventDefault();
  const book = createBookObject(titleInput.value, authorInput.value, pagesInput.value, readStatusCheckbox.checked);
  if (isValid(book)) {
    myLibrary.push(book);
    updateLocalStorage(myLibrary);
    appendToTable(book, myLibrary.length - 1);
    clearForm();
  }
});

tableBody.addEventListener('click', e => {
  if (e.target.classList.contains('read-status')) {
    const readStatus = toggleReadStatus(e.target);
    const index = e.target.parentElement.parentElement.dataset.index;
    updateReadStatus(readStatus, index);
  }

  if (e.target.closest('.remove')) {
    const removeButton = e.target.closest('.remove');
    removeBook(removeButton);
  }
});

function updateBookArray() {
  let existingBooks = JSON.parse(localStorage.getItem('books'));
  if (existingBooks === null) existingBooks = [];
  myLibrary = [...existingBooks];
}

function initializeTable(bookArray) {
  for (let i = 0; i < bookArray.length; i++) {
    appendToTable(bookArray[i], i);
  }
}

function appendToTable(bookObject, index) {
  const newRow = document.createElement('tr');
  newRow.dataset.index = index;
  for (let i = 0; i < 5; i++) {
    const newCell = document.createElement('td');
    if (i === 0) newCell.textContent = bookObject.title;
    if (i === 1) newCell.textContent = bookObject.author;
    if (i === 2) newCell.textContent = bookObject.pages;
    if (i === 3) addReadStatus(bookObject.readStatus, newCell);
    if (i === 4) addRemoveButton(newCell);
    newRow.appendChild(newCell);
    tableBody.appendChild(newRow);
  }
}

function isValid(bookToCheck) {
  for (const book of myLibrary) {
    if (book.title === bookToCheck.title && book.author === bookToCheck.author && book.pages === bookToCheck.pages) {
      message.textContent = '*This book already exists';
      return false;
    }
  }
  return true;
}

function clearForm() {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readStatusCheckbox.checked = false;
  message.textContent = '';
}

function addReadStatus(checked, tdElement) {
  const readButton = document.createElement('button');
  readButton.classList.add('read-status');
  if (checked) {
    readButton.classList.add('read');
    readButton.textContent = 'READ';
  } else {
    readButton.classList.remove('read');
    readButton.textContent = 'NOT READ';
  }
  tdElement.appendChild(readButton);
}

function addRemoveButton(tdElement) {
  const removeButton = document.createElement('button');
  const removeIcon = document.createElement('img');
  removeButton.classList.add('remove');
  removeIcon.setAttribute('src', './assets/remove.svg');
  removeIcon.setAttribute('alt', 'remove icon');
  removeButton.appendChild(removeIcon);
  tdElement.appendChild(removeButton);
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

function updateLocalStorage(bookArray) {
  localStorage.setItem('books', JSON.stringify(bookArray));
}

function toggleReadStatus(readStatusButton) {
  readStatusButton.classList.toggle('read');
  readStatusButton.textContent = (readStatusButton.classList.contains('read')) ? 'READ' : 'NOT READ';
  return readStatusButton.classList.contains('read');
}

function updateReadStatus(readStatus, index) {
  myLibrary[index].readStatus = readStatus;
  updateLocalStorage(myLibrary);
}

function removeBook(removeButton) {
  const index = removeButton.parentElement.parentElement.dataset.index;
  myLibrary.splice(index, 1);
  updateLocalStorage(myLibrary);
  clearTable();
  initializeTable(myLibrary);
}

function clearTable() {
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}