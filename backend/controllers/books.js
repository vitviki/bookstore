import { Book } from "../models/book.js";

// Retrieves all the books available at the store
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    if (!books) {
      console.log("ERROR: Unable to fetch books");
      return res.status(500).send("ERROR: Unable to fetch books");
    }

    return res.status(200).send({
      count: books.length,
      data: { books },
    });
  } catch (err) {
    console.log(err);
    console.log("ERROR: Unable to fetch books");
    return res.status(500).send({
      ERROR: "Unable to fetch books",
      Detail: err,
    });
  }
};

// Get a book using the ID provided
export const getBook = async (req, res) => {
  try {
    if (!req.params.id) {
      console.log("ERROR: Please provide a book ID");
      return res.status(500).send("ERROR: Please provide a book ID");
    }

    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      console.log("ERROR: Unable to fetch book with the provided ID");
      return res
        .status(404)
        .send("ERROR: Unable to fetch book with the provided ID");
    }

    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
    console.log("ERROR: Unable to fetch book with the provided ID");
    return res.status(500).send({
      ERROR: "Unable to fetch book with the provided ID",
      Detail: err,
    });
  }
};

// Add a book
export const addBook = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishedYear ||
      !req.body.description
    ) {
      console.log("ERROR: Please fill in all the details");
      return res.status(400).send({
        ERROR: "Please fill in all the details",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
      description: req.body.description,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
    console.log("ERROR: Unable to add the new book");
    return res.status(500).send({
      ERROR: "Unable to add the new book",
      Detail: err,
    });
  }
};

// Update an existing book
export const updateBook = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishedYear ||
      !req.body.description
    ) {
      console.log("ERROR: Please fill in all the details");
      return res.status(400).send({
        ERROR: "Please fill in all the details",
      });
    }

    // Get ID from params.
    const { id } = req.params;

    // Find book by ID and update.
    const result = await Book.findByIdAndUpdate(id, req.body);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    console.log("ERROR: Unable to update");
    return res.status(500).send({
      ERROR: "Unable to update",
      Detail: err,
    });
  }
};
