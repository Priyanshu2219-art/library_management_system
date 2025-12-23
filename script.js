// Get DOM elements
const bookForm = document.getElementById("book-form");
const bookTableBody = document.querySelector("#book-table tbody");
const searchInput = document.getElementById("search");

// Load books from localStorage on page load
document.addEventListener("DOMContentLoaded", displayBooks);
bookForm.addEventListener("submit", addBook);
bookTableBody.addEventListener("click", deleteBook);
searchInput.addEventListener("input", filterBooks);

// Get books from localStorage
function getBooksFromStorage() {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
}

// Save books to localStorage
function saveBooksToStorage(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

// Display books in the table
function displayBooks() {
  const books = getBooksFromStorage();
  bookTableBody.innerHTML = "";

  books.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.status}</td>
      <td>
        <button class="action-btn delete-btn" data-index="${index}">
          Delete
        </button>
      </td>
    `;
    bookTableBody.appendChild(row);
  });
}

// Add book
function addBook(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const isbn = document.getElementById("isbn").value.trim();
  const status = document.getElementById("status").value;

  if (!title || !author || !isbn) {
    alert("Please fill all the fields.");
    return;
  }

  const newBook = { title, author, isbn, status };

  const books = getBooksFromStorage();
  books.push(newBook);
  saveBooksToStorage(books);

  bookForm.reset();
  displayBooks();
}

// Delete book
function deleteBook(e) {
  if (!e.target.classList.contains("delete-btn")) return;

  const index = e.target.getAttribute("data-index");
  const books = getBooksFromStorage();

  books.splice(index, 1);
  saveBooksToStorage(books);
  displayBooks();
}

// Filter books
function filterBooks() {
  const query = searchInput.value.toLowerCase();
  const rows = bookTableBody.querySelectorAll("tr");

  rows.forEach((row) => {
    const title = row.children[0].textContent.toLowerCase();
    const author = row.children[1].textContent.toLowerCase();

    if (title.includes(query) || author.includes(query)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}