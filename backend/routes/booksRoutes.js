import express from "express";
import {
  getAllBooks,
  getBook,
  addBook,
  //updateBook,
  //deleteBook,
} from "../controllers/books.js";

const router = express.Router();

// Get all books
router.get("/", getAllBooks);

// Get a specific book using ID
router.get("/:id", getBook);

// Add a new book
router.post("/", addBook);

// Update an exisiting book

// Delete a book

export default router;
