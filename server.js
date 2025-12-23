import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware - allows frontend to call backend
app.use(cors());
app.use(express.json());

// Fake database (books stored in memory)
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", isbn: "9780062315007", status: "Available" },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", status: "Issued" }
];

// API Routes

// GET /api/books - Get all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// POST /api/books - Add new book
app.post("/api/books", (req, res) => {
  const { title, author, isbn, status } = req.body;

  // Validate input
  if (!title || !author || !isbn) {
    return res.status(400).json({ message: "Title, author, and ISBN are required" });
  }

  // Create new book
  const newBook = {
    id: Date.now(),  // Simple ID using timestamp
    title,
    author,
    isbn,
    status: status || "Available"
  };

  // Add to "database"
  books.push(newBook);
  
  res.status(201).json(newBook);
});

// DELETE /api/books/:id - Delete book by ID
app.delete("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = books.length;
  
  // Filter out the book with matching ID
  books = books.filter(book => book.id !== id);
  
  // Check if book was found and deleted
  if (books.length === initialLength) {
    return res.status(404).json({ message: "Book not found" });
  }
  
  res.json({ message: "Book deleted successfully" });
});

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Library Management Backend is running on port 5000" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Test API: http://localhost:${PORT}/api/books`);
});